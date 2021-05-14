function getAppointmentsForDay(state, name) {
  const filteredDays = state.days.filter(day => day.name === name);
  // console.log(filteredDays)
  if(filteredDays.length > 0){
    const appointmentsId= filteredDays[0].appointments;
    const appointments=[];
    // if()
    appointmentsId.forEach((id) =>{
     appointments.push(state.appointments[id]); 
    });
    return appointments;
  }else{
    return[];
  }
  
}


module.exports ={getAppointmentsForDay}
