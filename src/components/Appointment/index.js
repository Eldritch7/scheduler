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

//Passing the mode to visual Mode
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
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
  />
)}
{mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel = {back}
          
        />
      )}
{/* {props.interview ? <Show 
student = {props.interview.student}
interviewer = {props.interview.interviewer}
/> : 
<Empty />} */}



</article>

  );
}
