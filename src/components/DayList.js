import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={(event) => props.onChange(day.name)} 
       
      />
    );
  });
  return(
    <ul>
      {days}
      
    </ul>

  );
}
