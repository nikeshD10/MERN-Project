import React, { useReducer } from "react";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    // case "TOUCH":
    //   return {
    //     ...state,
    //     isTouched: true,
    //   };
    default:
      return state;
  }
};

export default function Input(props) {
  const initialState = {
    value: "",
    isValid: false,
  };

  // Returns an array of two elements just like usestate
  const [inputState, dispatch] = useReducer(inputReducer, initialState);
  const changeHandler = (event) => {
    let action = {
      type: "CHANGE",
      val: event.target.value, // also known as payload
    };
    dispatch(action);
  };
  const content =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {content}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
}
