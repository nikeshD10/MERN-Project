import React, { useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": // if the type of action is CHANGE then it returns the new state object with value and isvalid are overrided with new values
      return {
        ...state,
        value: action.val, // sets value property to action val
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": // if the action type is TOUCH then it return new state object with isTouched property is overrided.
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
    //initial state of input
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  };

  // Returns an array of two elements just like usestate
  const [inputState, dispatch] = useReducer(inputReducer, initialState); // we get inputState along with method to dispatch action

  const { id, onInput } = props; // so we are receiving onInput as props which is inputHandler function in NewPlace.js
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    // this function reads the event param and dispatch the action with type CHANGE and set val property to input value and validators to validators we receive as props.
    let action = {
      type: "CHANGE",
      val: event.target.value, // also known as payload
      validators: props.validators,
    };
    dispatch(action); // now we dispatch the action. and it will call the input reducer and set the inital state of input.
  };

  const touchHandler = (event) => {
    let action = {
      type: "TOUCH",
    };
    dispatch(action);
  };

  const content =
    props.element === "input" ? ( // so if the element is input then it will show the input box else it will show the textarea
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler} // this will call changeHandler which update value along with check input is valid or not.
        value={inputState.value}
        onBlur={touchHandler} // this will call touchHandler which check if input box is touched or not.
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
    // so depending upon isvalid and istouched property of input state it renders form input box
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid" // SO this line means form-control--invalid will added if the input is invalid and user touched it
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>{" "}
      {/* This will show the label above the input box  */}
      {content} {/* This will show the individual input box*/}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
      {/* This will show the error message if the inputstate is not valid is touched  */}
    </div>
  );
}
