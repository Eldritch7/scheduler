export function getAppointmentsForDay(state, day) {
  let results = [];
  let appointmentsArray = [];

  if (!state.days) {
    return [];
  }

  state.days.map((aDay) => {
    if (aDay.name === day) {
      appointmentsArray = aDay.appointments;
    }
  });

  for (let num of appointmentsArray) {
    let placeholder = num.toString();
    results.push(state.appointments[placeholder]);
  }
  return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  if (interview.interviewer === null) {
    return null;
  }
  let thisInterviewer = interview.interviewer;
  let thisInterviewerString = thisInterviewer.toString();
  let interviewerData = state.interviewers[thisInterviewerString];
  let student = interview.student;
  let results = {
    student: student,
    interviewer: interviewerData,
  };
  return results;
}

export function getInterviewersForDay(state, day) {
  let results = [];
  let interviewersArray = [];

  if (!state.days) {
    return [];
  }

  state.days.map((aDay) => {
    if (aDay.name === day) {
      interviewersArray = aDay.interviewers;
    }
  });

  for (let num of interviewersArray) {
    let placeholder = num.toString();
    results.push(state.interviewers[placeholder]);
  }
  return results;
}
