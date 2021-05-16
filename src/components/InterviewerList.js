import React from "react";
import InterviewerListItem from "./InterviewerListItem.js"
import "components/InterviewerList.scss";


export default function InterviewerList (props) {
  // if(props.interviewers.length === 0) {
  //   const interviewers = []
  //   return interviewers;
  // }

  const interviewers = props.interviewers.map((interviewer)=>{
    return(
   <InterviewerListItem 
   key = {interviewer.id}
   name = {interviewer.name}
   avatar ={interviewer.avatar}
   selected = {interviewer.id === props.value}
   setInterviewer={(event)=>props.onClick(interviewer.id)}
   />
    )
  })

  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
  )
}
