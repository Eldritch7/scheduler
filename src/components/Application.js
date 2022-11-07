import React, {useState, useEffect} from "react";
import axios from '../../node_modules/axios/index';
import "components/Application.scss";

//Import Components
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';

//Helper Functions
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


//Application

export default function Application(props) {
//all of the data in one state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Using Helper functions:
  //Daily Interviewers - hold interviewers for specific day
  const dailyInterviewers = getInterviewersForDay(state, state.day);
//Daily Appoinments - hold appointments for specific day
const dailyAppointments = getAppointmentsForDay(state, state.day);

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



//updating
const appointments = getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day);

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
    />
  );
});
// //Convert Data Object to Array of appointments
// const appointmentsArray = dailyAppointments.map(appointment => {
//   return (
//     <Appointment
//     key={appointment.id}
//     {...appointment}
//     />

//   )
// });


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        
      </section>
    </main>
  );
}
