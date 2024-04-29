import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const [textData, setTextData] = useState([
    {
      text: "All right, round one.",
      startTime: 0,
      endTime: 3.06,
    },
    {
      text: "Here.",
      startTime: 3.06,
      endTime: 4.03,
    },
    { text: "Got it. Okay.", startTime: 4.03, endTime: 6.07 },
    { text: "Ready, set,", startTime: 6.07, endTime: 7.78 },
    { text: "go.", startTime: 7.79, endTime: 9.49 },
    { text: "Uh, box?", startTime: 10.9, endTime: 11.9 },
    { text: "Uh,", startTime: 11.91, endTime: 13.41 },
    { text: "window?", startTime: 13.41, endTime: 14.81 },
    { text: "Batman.", startTime: 15.81, endTime: 17.11 },
    { text: "LEONARD: Batman and Robin.", startTime: 18.5, endTime: 20.91 },
    {
      text: "Uh, Wonder Twins plus the monkey.",
      startTime: 23.15,
      endTime: 25.12,
    },
    {
      text: "Wonder Twins plus the monkey <i>and</i> Batman.",
      startTime: 26.84,
      endTime: 29.15,
    },
    { text: "A gift? Present!", startTime: 30.94, endTime: 32.16 },
    { text: "Present! Yeah!", startTime: 32.16, endTime: 33.34 },
    { text: "Oh... Leonard.", startTime: 33.34, endTime: 35.95 },
    {
      text: "Now, how can you not get that?",
      startTime: 35.95,
      endTime: 38.63,
    },
    {
      text: "In what universe is that a present?",
      startTime: 38.63,
      endTime: 42.69,
    },
    { text: "It's not <i>a</i> present,", startTime: 42.69, endTime: 44.15 },
    {
      text: "it's <i>the</i> present. Look.",
      startTime: 44.16,
      endTime: 46.27,
    },
    { text: "There's you and me.", startTime: 46.27, endTime: 47.97 },
    { text: "It's Penny and Amy.", startTime: 47.98, endTime: 49.51 },
    { text: "We're playing Pictionary.", startTime: 49.51, endTime: 51.94 },
    { text: "In the present.", startTime: 51.95, endTime: 54.25 },
    {
      text: "Oh, my God, we're gonna kill them.",
      startTime: 58.5,
      endTime: 61.29,
    },
    { text: "It's a quark-gluon plasma.", startTime: 63.42, endTime: 65.79 },
    { text: "No.", startTime: 66.68, endTime: 67.64 },
    {
      text: "It's asymptotically free partons",
      startTime: 67.65,
      endTime: 69.58,
    },
    { text: "inside a quark-gluon plasma.", startTime: 69.58, endTime: 72.2 },
    { text: "Nothing with quarks.", startTime: 72.2, endTime: 74.67 },
    {
      text: "It's an observational rebuttal",
      startTime: 74.67,
      endTime: 76.47,
    },
    {
      text: "of the Lambda-CDM model of the universe!",
      startTime: 76.47,
      endTime: 79.17,
    },
    { text: "No!", startTime: 80.34, endTime: 81.32 },
  ]);

  useEffect(() => {
    const fetchAllusions = async () => {
      try {
        textData.forEach(async (item, index) => {
          const response = await axios.post(
            `${process.env.REACT_APP_LLM_SERVICE_URL}`,
            // "/v2/models/ensemble/generate"
            {
              text_input: "How is New York University?",
              max_tokens: 200,
              bad_words: "",
              stop_words: "",
              pad_id: 2,
              end_id: 2,
            }
          );
          const allusion = response.data.text_output;
          setTextData((prevTextData) => {
            const updatedTextData = [...prevTextData];
            updatedTextData[index] = { ...item, allusion };
            return updatedTextData;
          });
        });
      } catch (error) {
        console.error("Error fetching allusions:", error);
      }
      // try {
      //   const requests = textData.map(async (item, index) => {
      //     const response = await axios.get(
      //       // `${process.env.REACT_APP_API_BASE_URL}`
      //       "https://jsonplaceholder.typicode.com/posts"
      //     );
      //     const allusion = response.data[0].body;
      //     return { ...item, allusion };
      //   });

      //   const updatedTextData = await Promise.all(requests);
      //   setTextData(updatedTextData);
      // } catch (error) {
      //   console.error("Error fetching allusions:", error);
      // }
    };

    fetchAllusions();

    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="video-player">
      <h1 className="title">
        Demo of the LLMs for Annotating Complex Cultural Memes project
      </h1>
      <div className="video-container">
        <video ref={videoRef} src="/video.mp4" controls />
      </div>
      <div className="subtitle-container">
        {textData.map((item, index) => {
          const isActive =
            currentTime >= item.startTime && currentTime < item.endTime;
          return (
            <div key={index}>
              {isActive && item.text && (
                <div className={`subtitle active`}>{item.text}</div>
              )}
              {isActive && item.allusion && (
                <div className={`allusion active`}>
                  Allusion: {item.allusion}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
