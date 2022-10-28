import React, {useState, useEffect} from "react";
import Axios from '../../node_modules/axios/index';
import "components/Application.scss";

//Import Components
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';



//Mock Data Appointments
const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};




//Application

export default function Application(props) {
//useState variables
const [day, setDay] = useState('Monday');
//Days State to replace static data
const [days, setDays] = useState([]);
//Get days from the server

useEffect(() => {
  const daysUrl =  `http://localhost:8001/api/days`;
  Axios.get(daysUrl).then(response => {

    console.log(`response:`, response);
    setDays([...response.data]);
    console.log(`response.data in days:`, response.data);
  })

}, []);




//Convert Data Object to Array of appointments
const appointmentsArray = Object.values(appointments).map(appointment => {
  return (
    <Appointment
    key={appointment.id}
    {...appointment}
    />

  )
});

console.log(day);
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
  days={days}
  value={day}
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
        {appointmentsArray}
        
      </section>
    </main>
  );
}
