import React from 'react';
import classNames from 'classnames';
import "components/InterviewerList.scss";

//Import Component
import InterviewerListItem from './InterviewerListItem';


export default function InterviewerList(props) {
  //Make an array of Component
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name} 
        
        avatar={interviewer.avatar} 
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)} 
      />
    );
  });

  return(
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewers</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
  );
}
