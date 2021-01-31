import React, { createContext, useState, useEffect } from "react";
import { trackLyricsGet, trackGet } from "./../constants/index";

export const LyricsContext = createContext();

const LyricsContextProvider = ({ children }) => {
  const commontrack_id = window.location.pathname;
  const [doneFetchTrack, setDoneFetchTrack] = useState(false);
  const [doneFetchLyrics, setDoneFetchLyrics] = useState(false);
  const [track, setTrack] = useState([]);
  const [lyrics, setLyrics] = useState([]);
};

export default LyricsContextProvider;
