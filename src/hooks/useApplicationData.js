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

  //Book interview function
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const appointmentsUrl = `/api/appointments/${id}`;
    return axios.put(appointmentsUrl, appointment)
    .then(
    setState({
      ...state,
      appointments
    })
  );
  }

  //Cancel Interview function
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios
      .delete(`api/appointments/${id}`)
      .then(
          setState({
            ...state,
            appointments
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
