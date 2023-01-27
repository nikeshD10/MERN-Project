import React, { useReducer } from "react";

import "./Input.css";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

export default function Input(props) {
  const initialState = {
    value: "",
    isValid: false,
    isTouched: false,
  };

  // Returns an array of two elements just like usestate
  const [inputState, dispatch] = useReducer(inputReducer, initialState);
  const changeHandler = (event) => {
    let action = {
      type: "CHANGE",
      val: event.target.value, // also known as payload
      validators: props.validators,
    };
    dispatch(action);
  };

  const touchHandler = (event) => {
    let action = {
      type: "TOUCH",
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
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid" // SO this line means form-control--invalid will added if the input is invalid and user touched it
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {content}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
