import React from 'react';
import './LoginErrors.css';

export function LoginErrors(props) {
  return (
    <div className="LoginErrors">
      <span> {props.message} </span>
    </div>
  )
}