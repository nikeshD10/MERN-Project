import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true; // set initially the form is valid when it renders first time.
      for (const inputId in state.inputs) {
        // since we have multiple inputs so we need to validate multiple inputs so we go through objects of inputs using for loop
        if (inputId === action.inputId) {
          // if the input I am currently looking at is that the input which is getting updated in current action then
          formIsValid = formIsValid && action.isValid; // i will take the information from the dispatched action on wheather input is valid or not
          // action.isValid is checking if input is valid or not which comes from input.js
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
          // if the input I am currently looking at is not the input which is getting updated in current action then
          // i will take the information from the state of the input which is not getting updated in current action
          // state.inputs[inputId].isValid is checking if input is valid or not which comes from input.js
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  let initialState = {
    inputs: {
      // inputs is nested object that stores the information of validity of individual input
      title: {
        // Both value is coming from input js
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    isValid: false, // stores the information wheather or not overall form is valid
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const inputHandler = useCallback((id, value, isValid) => {
    // all this value, isValid, id inside action is coming from input.js since this function is being called inside useEffect of input.js
    const action = {
      type: "INPUT_CHANGE",
      value: value, // any value you type in keyboard eg: test
      isValid: isValid, // initially it is false but depends upon validate functio from validator where validators goes as props.
      inputId: id, // eg: title
    };
    dispatch(action);
  }, []);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to backend
  };

  return (
    <form action="" className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        // placeholder="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="input"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
