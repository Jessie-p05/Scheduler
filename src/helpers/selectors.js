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
  
function getInterviewersForDay(state, name) {
  const filteredDays = state.days.filter(day => day.name === name);
  // console.log(filteredDays)
  if(filteredDays.length > 0){
    const interviewersId= filteredDays[0].interviewers;
    const interviewers=[];
    // if()
    interviewersId.forEach((id) =>{
     interviewers.push(state.interviewers[id]); 
    });
    return interviewers;
  }else{
    return[];
  }
}
  

function getInterview(state, interview) {
 if (!interview){
   return null;
 }
 
 const interviewers = state.interviewers;
 const interviews= {
   student : interview.student,
   interviewer : {
     id : interview.interviewer,
     name : interviewers[interview.interviewer].name,
    avatar: interviewers[interview.interviewer].avatar
   }
} 
return interviews
}

module.exports ={getAppointmentsForDay,getInterview, getInterviewersForDay}
