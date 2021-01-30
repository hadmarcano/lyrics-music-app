import React, { createContext, useState, useEffect } from "react";
import { chartTracksGet, trackSearch } from "../../constants";

export const SongsContext = createContext();

const SongsContextProvider = ({}) => {
  // Inicializamos variables que pueden mutar con useState()
  const [doneFetch, setDoneFetch] = useState(); // undefined
  const [currentQTrack, setCurrentQTrack] = useState("");
  const [text, setText] = useState("Top Songs In Us");
  const [tracks, setTracks] = useState([]);

  useEffect(() => getTopTracks(), []);

  const getTopTracks = () => {
    fetch(chartTracksGet())
      .then((res) => res.json())
      .then((data) => {
        setDoneFetch(true);
        setTracks(data.message.body.track_list);
      })
      .catch((err) => console.log(err));
  };

  const getTracks = (q_tracks) => {
    fetch(trackSearch(q_tracks));
  };
};

export default SongsContextProvider;
