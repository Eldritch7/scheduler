
export function getAppointmentsForDay(state, day) {
  let results = [];
  let appointmentsArray = [];

  if(!state.days) {
    return [];
  }

  state.days.map(aDay => {
    if (aDay.name === day) {
      appointmentsArray = (aDay.appointments);
    }
  })

for (let num of appointmentsArray) {
  let placeholder = num.toString(); 
  results.push(state.appointments[placeholder]);
}
  return results;
}
