import React from 'react';
import './ValidationErrors.css';

export function ValidationErrors(props) {
  return (
    <div className="LoginErrors">
      <span> {props.message} </span>
    </div>
  )
}