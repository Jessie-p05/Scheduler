import { useState, useEffect } from "react";
const axios = require('axios').default;


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // fetch the initial data in database;
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:8001";
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data, spots: all[0].data.spots }));
    })
  }, []);

  const setDay = day => setState({ ...state, day });
  //function to update spots in the state when a change in the appointment
  const updateSpots = (id,action)=>{
    let remainSpots;
    const [day] = state.days.filter(day => day.appointments.includes(id));

    if(action === "book"){
      //if edit in a exist appointment, spots will not change
      if(state.appointments[id].interview) {
        remainSpots = state.days[day.id - 1].spots;
      } else {
        //create a new appointment, spots will be one less
        remainSpots = state.days[day.id - 1].spots - 1;
      }
      
    } else{
      // by cancel a appointment, spots + 1
       remainSpots = state.days[day.id - 1].spots + 1;
    };

    //create a new array with the updated spots 
    const newDays = state.days.map(ele => ele.id === day.id ? { ...ele, spots: remainSpots } : { ...ele });
    return newDays;
  }

  // function to create a new interview in database and change the current state;
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const newDays = updateSpots(id,"book");
       
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          days: [...newDays],
          appointments: { ...state.appointments, [id]: appointment },
        })
      });

  };

  //function to cancel a exist interview in database and change the current state;
  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const newDays = updateSpots(id,"cancel");

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          days: [...newDays],
          appointments: { ...state.appointments, [id]: appointment },
        })

      });
  };
  
  return { state, setDay, bookInterview, cancelInterview }
}