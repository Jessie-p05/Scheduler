function getAppointmentsForDay(state, name) {
  //find the days data of a selected day
  const filteredDays = state.days.filter(day => day.name === name);

  if (filteredDays.length > 0) {
    //find all the appointments' id in that day
    const appointmentsId = filteredDays[0].appointments;
    const appointments = [];
    //collect all the appointments data by the Id array and push them into a new array
    appointmentsId.forEach((id) => {
      appointments.push(state.appointments[id]);
    });
    return appointments;
  } else {
    return [];
  }
}

function getInterviewersForDay(state, name) {
  //find the days data of a selected day
  const filteredDays = state.days.filter(day => day.name === name);
  if (filteredDays.length > 0) {
    //find all the interviewers' id in that day
    const interviewersId = filteredDays[0].interviewers;
    const interviewers = [];
    //collect all the interviewers' data by the Id array and push them into a new array
    interviewersId.forEach((id) => {
      interviewers.push(state.interviewers[id]);
    });
    return interviewers;
  } else {
    return [];
  }
}


function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewers = state.interviewers;
  const interviews = {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: interviewers[interview.interviewer].name,
      avatar: interviewers[interview.interviewer].avatar
    }
  }
  return interviews
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }
