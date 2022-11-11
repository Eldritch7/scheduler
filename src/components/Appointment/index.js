import React, { Fragment } from "react";
//Style
import "components/Appointment/styles.scss";
//Components
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

//Custom Hooks
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  //Modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

  transition(SAVING);
  
  console.log('saving transition');
  props.bookInterview(props.id, interview)
  //.then(transition(SAVING))
  .then(() => transition(SHOW))
  .catch(error => transition(ERROR_SAVE, true)
      
    )
}
// Delete Function
function cancelInterview(event) {

  transition(DELETING, true);
  props
   .cancelInterview(props.id)
   .then(() => transition(EMPTY))
   .catch(error => transition(ERROR_DELETE, true));
  
}

  //returning components
  return (
    
<article className="appointment" data-testid="appointment">
<Header
time={props.time}
/>
{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={() => transition(CONFIRM)}
    onEdit={() => transition(EDIT)}
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
message = "Saving"
  />
)}
{mode === DELETING && (
  <Status
  message = "Deleting"
  />
)}
{mode === CONFIRM && (
  <Confirm
  message = "Are you sure?"
  onConfirm = {cancelInterview}
  onCancel = {() => back(EMPTY)}
  />
)}
 {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel = {back}
          onSave = {save}
        />
      )}

      {mode === ERROR_SAVE && (
      <Error
      message = "Failed to Save"
      onClose = {back}
      />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message = "Failed to Delete"
        onClose = {back}
        />
      )}




</article>

  );
}

