import react, { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  //all of the data in one state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


function getDayIdFromInterview(id, interview) {
  const days = [...state.days];
  // console.log('days', days);
  let thisDayArray = days.map(day => {
  for (let appt of day.appointments) {
    if (appt === id)
    return day.id;
  }
})

const thisDayIdArray = thisDayArray.filter(day => day !== undefined);
const thisDayId = thisDayIdArray[0];
  return thisDayId;  
}

function getSpotsFromInterview(id, interview) {
  let days = state.days;
  let spots = 0;
  let dayId = getDayIdFromInterview(id, interview);
  // console.log(dayId, `dayId`);
  // console.log('state.days.dayID', days[dayId-1].appointments);
  let appointmentArray = days[dayId-1].appointments;
  // console.log(appointmentArray, `appointmentArray`);
  
  for (let app of appointmentArray) {
  // console.log(`app`,app);
  // console.log(state.appointments[app].interview)
  
  if (!state.appointments[app].interview) {
    spots += 1;
  }
  if (spots<1) {
    spots = 0;
  }
  console.log(`spots`, spots);
}
  return spots;
}

  //Book interview function
 
  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let dayId = getDayIdFromInterview(id, interview);
    let spotsLeft = getSpotsFromInterview(id, interview);
    // console.log('spotsLeft', spotsLeft);
    let thisDayData = state.days[dayId-1];
    let newDayData = {...thisDayData, spots: getSpotsFromInterview(id, interview)-1}
    // console.log('thisDayData',thisDayData);
    // console.log('newDayData', newDayData);
    let days = [...state.days.slice(0, dayId -1),  newDayData, ...state.days.slice( dayId, state.days.length)];

    const appointmentsUrl = `/api/appointments/${id}`;
    return axios.put(appointmentsUrl, appointment)
    .then(
    setState({
      ...state,
      appointments,
      days
    })
   
  );
  }

  //Cancel Interview function
  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let dayId = getDayIdFromInterview(id, interview);
    let spotsLeft = getSpotsFromInterview(id, interview);
    // console.log('spotsLeft', spotsLeft);
    let thisDayData = state.days[dayId-1];
    let newDayData = {...thisDayData, spots: getSpotsFromInterview(id, interview) +1}
    // console.log('thisDayData',thisDayData);
    // console.log('newDayData', newDayData);
    let days = [...state.days.slice(0, dayId -1),  newDayData, ...state.days.slice( dayId, state.days.length)];
    
  
    return axios
      .delete(`api/appointments/${id}`)
      .then(() =>
          setState({
            ...state,
            appointments,
            days
          })
      );
  };


  //setDay function
const setDay = day => setState({ ...state, day });
const setDays = (days) => {
  setState(prev => ({ ...prev, days }));
}

//Get days from the server

useEffect(() => {
  const daysUrl =  `http://localhost:8001/api/days`;
  const appointmentsUrl = `http://localhost:8001/api/appointments`;
  const interviewersUrl = `http://localhost:8001/api/interviewers`;

  Promise.all([
    axios.get(daysUrl),
    axios.get(appointmentsUrl),
    axios.get(interviewersUrl)
  ]).then((all) => {
    setState(prev => ({...prev, 
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data 
    }));
    console.log(all)
    console.log(all[0]); // first
    console.log(all[1]); // second
    console.log(all[2]); // third
  });

}, []);
return { state, setDay, bookInterview, cancelInterview };
}
