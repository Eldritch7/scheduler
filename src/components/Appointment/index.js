import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";


export default function Appointment(props) {
  return (
<article className="appointment">
<Header
time={props.time}
/>
{props.interview === true ? <Show /> : <Empty />}



</article>

  );
}
