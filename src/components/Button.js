import React from "react";

import "components/Button.scss";

import classNames from 'classnames';

export default function Button(props) {
  


let onClick;

let buttonClass = classNames('button', {
  'button--confirm' : props.confirm,
  'button--danger' : props.danger

}
);

// if (props.confirm) {
//   buttonClass += " button--confirm";
// }

// if (props.danger) {
//   buttonClass += " button--danger";
// }


   return <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>;
}
