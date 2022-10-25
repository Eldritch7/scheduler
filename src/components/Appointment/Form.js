import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import "components/Appointment/styles.scss";




export default function Empty(props) {
//Hooks
  const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

//Making a reset function
const reset = () => {
  
  setInterviewer(null);
  setStudent("");

}

  //Cancel Function
  const cancel = () => {
    reset();
    props.onCancel();
  }

  return ( 
   
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
        
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList 
    interviewers={props.interviewers}
    interviewer={interviewer}
    onChange={setInterviewer}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={(e)=> {props.onSave(student, interviewer)}}>Save</Button>
    </section>
  </section>
</main>

  );
}
