import { useState, useEffect} from "react";
const axios = require('axios').default;

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // fetch the initial data in database;
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])


  // function to create a  new interview in database change the current state;
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments: { ...state.appointments, [id]: appointment },
        })

      })
  }
  //function to cancel a exist interview in database and change the current state;
  function cancelInterview(id) {
    console.log(id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments: { ...state.appointments, [id]: appointment },
        })

      })
  }
  return{state,setDay,bookInterview,cancelInterview}
}