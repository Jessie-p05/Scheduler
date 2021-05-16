import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import Appointment from "components/Appointment"

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"
const axios = require('axios').default;

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   const newDays = setState(prev => ({ ...prev, days }));
  //   return newDays;
  // }
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  //get all the appointments in a specific day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // function  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({
    //   ...state,
    //   appointments
    // });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(()=>{
        setState({
          ...state,
          appointments: { ...state.appointments, [id]: appointment },
        })
        
      })
  }

  function cancelInterview (id){
    console.log(id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(()=>{
        setState({
          ...state,
          appointments: { ...state.appointments, [id]: appointment },
        })

      })
  }

  //for every appointment in that day, create a Appointment component 
  const appointmentLists = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (<Appointment
      key={appointment.id}
      {...appointment} 
      id={appointment.id}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    // setState = {setState}
    />)
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={[...state.days]}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentLists}
        <Appointment key="last" time="5pm" />
      </section>
    </main>

  );
}
