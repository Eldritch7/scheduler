import React from 'react';

import 'components/InterviewerListItem.scss';
import classNames from 'classnames';


export default function InterviewerListItem(props) {
  const interviewerStyle = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected
    }
    );
    //console.log(props.id);
    let liClass = classNames('interviewers__item-image', {
      'interviewers__item-image--selected' : props.selected

    
    }
    );

   function visibleName() {
      if (props.selected) {
        return `${props.name}`;
      } else {
        return ``;
      }
    }
   
      return (
      <li onClick={props.setInterviewer} className={interviewerStyle}>
        <img
          className={liClass}
          src={props.avatar}
          alt={props.name}
        />
        {visibleName()}
      </li>
      );


    } 


