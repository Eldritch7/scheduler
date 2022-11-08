import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


import useVisualMode from "hooks/useVisualMode";






export default function Appointment(props) {
  //Modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

//Passing the mode to visual Mode
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
//Save Function
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING)
  console.log('saving transition');
  Promise.resolve(props.bookInterview(props.id, interview))
  .then(transition(SHOW))
  .catch(function (error) {
      console.log(error);
    })
}
// Delete Function
function cancelInterview(id) {
  transition(DELETING);
  Promise.resolve(props.cancelInterview(props.id))
  .then(transition(EMPTY))
  .catch(error => {
    console.log(error);
  })
}

  //returning components
  return (
    
<article className="appointment">
<Header
time={props.time}
/>
{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={() => transition(CONFIRM)}
  />
)}
{mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel = {back}
          onSave = {save}
          
        />
      )}


{mode === SAVING && (
  <Status
message = "Saving..."
  />
)}
{mode === CONFIRM && (
  <Confirm
  message = "Are you sure?"
  onConfirm = {cancelInterview}
  onCancel = {back}
  />
)}




</article>

  );
}

