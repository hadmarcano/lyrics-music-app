import React, { createContext, useState, useEffect } from "react";
import { chartTracksGet, trackSearch } from "../../constants";

export const SongsContext = createContext();

const SongsContextProvider = ({ children }) => {
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
    fetch(trackSearch(q_tracks))
      .then((res) => res.json())
      .then((data) => {
        const { track_list } = data.message.body;
        setDoneFetch(true);
        setText(track_list.length ? "Results" : "No Results");
        setTracks(track_list);
      })
      .catch((err) => console.log(err));
  };

  const validateQTrack = (
    e,
    q_track = document.querySelector("#qtrack").value.toLowerCase().trim()
  ) => {
    if (e.type === "keypress" && e.key !== "Enter") return;
    const words = q_track.match(/\w+/g); // RegExp : alfanumerico para buscar e forma individual por caracter o por palabra completa.
    q_track = words && words.join("");
    if (q_track && q_track !== currentQTrack) {
      setCurrentQTrack(q_track);
      setDoneFetch(false);
      getTracks(q_track);
    }
  };

  // A continuación se define un proveedor de contexto,
  // luego en Value definimos todas las propiedades que vamos a proveer hacia otros componentes.
  // Estas propiedades al ser proveidas hacia otros componentes van a ser gestionadas como "children".
  // De esta manera dejamos definido un contexto e indicamos que propiedades este va a dejar
  // disponibilizado para que los componentes trabajen con estas.
  return (
    <SongsContext.Provider value={{ doneFetch, text, tracks, validateQTrack }}>
      {children}
    </SongsContext.Provider>
  );
};

export default SongsContextProvider;
