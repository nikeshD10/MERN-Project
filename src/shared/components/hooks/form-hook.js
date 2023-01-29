import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true; // set initially the form is valid when it renders first time.
      for (const inputId in state.inputs) {
        // since we have multiple inputs so we need to validate multiple inputs so we go through objects of inputs using for loop
        if (!state.inputs[inputId]) {
          continue;
        }
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
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };

    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  let initialState = {
    inputs: initialInputs,
    isValid: initialFormValidity, // stores the information wheather or not overall form is valid
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

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
