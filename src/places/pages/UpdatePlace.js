import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/components/hooks/form-hook";

const dummyPlaces = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most tallest building of the New York",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FsBI2W7YNV4vRSVdbRVfASLH3F6I%3D%2F2617x3874%2Ffilters%3Afill(auto%2C1)%2F5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg&f=1&nofb=1&ipt=e5ca5d643234346120b89443c4ebf19c26c142185f39388dca8f3b6aa5213c6d&ipo=images",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most tallest building of the New York",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FsBI2W7YNV4vRSVdbRVfASLH3F6I%3D%2F2617x3874%2Ffilters%3Afill(auto%2C1)%2F5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg&f=1&nofb=1&ipt=e5ca5d643234346120b89443c4ebf19c26c142185f39388dca8f3b6aa5213c6d&ipo=images",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
  {
    id: "p3",
    title: "Empire State Building",
    description: "One of the most tallest building of the New York",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FsBI2W7YNV4vRSVdbRVfASLH3F6I%3D%2F2617x3874%2Ffilters%3Afill(auto%2C1)%2F5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg&f=1&nofb=1&ipt=e5ca5d643234346120b89443c4ebf19c26c142185f39388dca8f3b6aa5213c6d&ipo=images",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u3",
  },
];

export default function UpdatePlace() {
  const placeId = useParams().placeId;

  const [isLoading, setIsLoading] = useState(false);

  const identifiedPlace = dummyPlaces.find((p) => p.id === placeId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    setFormData({
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    });
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}
