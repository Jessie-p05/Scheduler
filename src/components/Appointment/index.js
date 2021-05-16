import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //function to save the change to appointment when creat a new appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(()=> transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  //function to cancel a exist interview;
  function onDelete() {
    transition(CONFIRM)
  }
  function onCancel (){
    transition(SHOW);
  }
  function onConfirm(){
    transition(DELETING,true);
    props.cancelInterview(props.id)
    .then(()=> transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
  
  function edit(){
    transition(EDIT)
  }
  
  function close(){
  // transition(props.interview ? SHOW : EMPTY)
  back()
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id = {props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={edit}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
      )}
      {mode === ERROR_SAVE && (
        <Error 
        message="Can not save"
        onClose={close}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message="Can not delete"
        onClose={close}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
        onCancel={onCancel}
        onConfirm={onConfirm}
        />
      )}
      {mode === CREATE && (
        <Form
          // appointment={props.appointment}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          // appointment={props.appointment}
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back(SHOW)}
          onSave={save}
        />
      )}
    </article>
  );
}