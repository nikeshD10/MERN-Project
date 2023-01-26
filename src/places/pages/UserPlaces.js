import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

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

export default function UserPlaces() {
  const userId = useParams().userId;
  const loadedPlaces = dummyPlaces.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
}
