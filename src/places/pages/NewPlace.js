import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form action="" className="place-form">
      <Input
        type="text"
        placeholder="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter the valid title"
      />
    </form>
  );
};

export default NewPlace;
