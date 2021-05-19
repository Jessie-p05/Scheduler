import { useState, useEffect } from "react";
const axios = require('axios').default;
// import axios, * as others from 'axios';
// import  * as axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    // spots: null
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
  }, [])

  const setDay = day => setState({ ...state, day });
  // const setSpots = spots => setState({
  //   ...state, spots
  // })


  // function to create a  new interview in database change the current state;
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    const [day] = state.days.filter(day => day.appointments.includes(id));
    const remainSpots = state.days[day.id - 1].spots - 1;
    const newDays = state.days.map(ele => ele.id === day.id ? { ...ele, spots: remainSpots } : { ...ele })
    // console.log(newDays)    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          days: [...newDays],
          appointments: { ...state.appointments, [id]: appointment },
        })
      })

  }
  //function to cancel a exist interview in database and change the current state;
  function cancelInterview(id) {
    // console.log(id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const [day] = state.days.filter(day => day.appointments.includes(id));
    const remainSpots = state.days[day.id - 1].spots + 1;
    const newDays = state.days.map(ele => ele.id === day.id ? { ...ele, spots: remainSpots } : { ...ele })

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          days: [...newDays],
          appointments: { ...state.appointments, [id]: appointment },
        })

      })
  }
  return { state, setDay, bookInterview, cancelInterview }
}