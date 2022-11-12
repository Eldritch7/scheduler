import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  //all of the data in one state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function getDayIdFromInterview(id, interview) {
    const days = [...state.days];
    let thisDayArray = days.map((day) => {
      for (let appt of day.appointments) {
        if (appt === id) return day.id;
      }
    });

    const thisDayIdArray = thisDayArray.filter((day) => day !== undefined);
    const thisDayId = thisDayIdArray[0];
    return thisDayId;
  }

  function getSpotsFromInterview(id, interview) {
    let days = state.days;
    let spots = 0;
    let dayId = getDayIdFromInterview(id, interview);
    let appointmentArray = days[dayId - 1].appointments;

    for (let app of appointmentArray) {
      if (!state.appointments[app].interview) {
        spots += 1;
      }
      if (spots < 1) {
        spots = 0;
      }
    }
    return spots;
  }
    //EXTRA Edit Interview Function

    function editInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
  
  
      const appointmentsUrl = `/api/appointments/${id}`;
      return axios.put(appointmentsUrl, appointment).then(
        setState({
          ...state,
          appointments,
          //days,
        })
      );
    }

  //Book interview function

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let dayId = getDayIdFromInterview(id, interview);
    let spotsLeft = getSpotsFromInterview(id, interview);
    let thisDayData = state.days[dayId - 1];
    let newDayData = {
      ...thisDayData,
      spots: getSpotsFromInterview(id, interview) - 1,
    };
    let days = [
      ...state.days.slice(0, dayId - 1),
      newDayData,
      ...state.days.slice(dayId, state.days.length),
    ];

    const appointmentsUrl = `/api/appointments/${id}`;
    return axios.put(appointmentsUrl, appointment).then(
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
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let dayId = getDayIdFromInterview(id, interview);
    let spotsLeft = getSpotsFromInterview(id, interview);
    let thisDayData = state.days[dayId - 1];
    let newDayData = {
      ...thisDayData,
      spots: getSpotsFromInterview(id, interview) + 1,
    };
    let days = [
      ...state.days.slice(0, dayId - 1),
      newDayData,
      ...state.days.slice(dayId, state.days.length),
    ];

    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState({
        ...state,
        appointments,
        days,
      })
    );
  };

  //setDay function
  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => {
    setState((prev) => ({ ...prev, days }));
  };

  //Get days from the server

  useEffect(() => {
    const daysUrl = `/api/days`;
    const appointmentsUrl = `/api/appointments`;
    const interviewersUrl = `/api/interviewers`;

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      console.log(all);
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview, editInterview };
}
