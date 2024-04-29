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

  const subtitles = [
    [
      "00:00:00,060 --> 00:00:03,060\\nAll right, round one.",
      "00:00:03,060 --> 00:00:04,030\\nHere.",
      "00:00:04,030 --> 00:00:06,070\\nGot it. Okay.",
      "00:00:06,070 --> 00:00:07,780\\nReady, set,",
      "00:00:07,790 --> 00:00:09,490\\ngo.",
      "00:00:10,900 --> 00:00:11,900\\nUh, box?",
      "00:00:11,910 --> 00:00:13,410\\nUh,",
      "00:00:13,410 --> 00:00:14,810\\nwindow?",
      "00:00:15,810 --> 00:00:17,110\\nBatman.",
      "00:00:18,500 --> 00:00:20,910\\nLEONARD: Batman and Robin.",
      "00:00:23,150 --> 00:00:25,120\\nUh, Wonder Twins plus the monkey.",
      "00:00:26,840 --> 00:00:29,150\\nWonder Twins plus the monkey <i>and</i> Batman.",
      "00:00:30,940 --> 00:00:32,160\\nA gift? Present!",
      "00:00:32,160 --> 00:00:33,340\\nPresent! Yeah!",
      "00:00:33,340 --> 00:00:35,950\\nOh... Leonard.",
      "00:00:35,950 --> 00:00:38,630\\nNow, how can you not get that?",
      "00:00:38,630 --> 00:00:42,690\\nIn what universe is that a present?",
    ],
    [
      "00:00:42,690 --> 00:00:44,150\\nIt's not <i>a</i> present,",
      "00:00:44,160 --> 00:00:46,270\\nit's <i>the</i> present. Look.",
      "00:00:46,270 --> 00:00:47,970\\nThere's you and me.",
      "00:00:47,980 --> 00:00:49,510\\nIt's Penny and Amy.",
      "00:00:49,510 --> 00:00:51,940\\nWe're playing Pictionary.",
      "00:00:51,950 --> 00:00:54,250\\nIn the present.",
      "00:00:58,500 --> 00:01:01,290\\nOh, my God, we're gonna kill them.",
      "00:01:03,420 --> 00:01:05,790\\nIt's a quark-gluon plasma.",
      "00:01:06,680 --> 00:01:07,640\\nNo.",
      "00:01:07,650 --> 00:01:09,580\\nIt's asymptotically free partons",
      "00:01:09,580 --> 00:01:12,200\\ninside a quark-gluon plasma.",
      "00:01:12,200 --> 00:01:14,670\\nNothing with quarks.",
      "00:01:14,670 --> 00:01:16,470\\nIt's an observational rebuttal",
      "00:01:16,470 --> 00:01:19,170\\nof the Lambda-CDM model of the universe!",
      "00:01:20,340 --> 00:01:21,320\\nNo!",
    ],
  ];

  function formatTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    const totalSeconds =
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseFloat(seconds.replace(",", "."));
    return parseFloat(totalSeconds.toFixed(2));
  }

  useEffect(() => {
    const fetchAllusions = () => {
      subtitles.forEach(async (subtitle, index) => {
        try {
          const textInput =
            index == 0
              ? JSON.stringify([
                  "[start of prompt:]",
                  "<s>[INST] <<SYS>>",
                  "Analyze the following dialogue excerpt from 'The Big Bang Theory' and identify and explain any allusions to famous movies. The explanation should not include the name of character.",
                  "Ensure that response are concise!",
                  "If there is no allusion in a subtitle, do not include it in the response.",
                  "Your response MUST be the following format:",
                  "[start of response]",
                  "[start time] - [Allusion1] - [Explanation for Allusion1] - [end time]",
                  "[start time] - [Allusion2] - [Explanation for Allusion2] - [end time]",
                  "...",
                  "[end of response]",
                  "<</SYS>>",
                  "[start of dialogue excerpt:]",
                  ...subtitle,
                  "[end of dialogue excerpt] [/INST]",
                  "[end of prompt]",
                ])
              : JSON.stringify([
                  "[start of prompt:]",
                  "<s>[INST] <<SYS>>",
                  "Analyze the following dialogue excerpt from 'The Big Bang Theory' and identify and explain any allusions to intricate scientific term. The explanation should not include the name of character.",
                  "Ensure that response are concise!",
                  "If there is no allusion in a subtitle, do not include it in the response.",
                  "Your response MUST be the following format:",
                  "[start of response]",
                  "[start time] - [Allusion1] - [Explanation for Allusion1] - [end time]",
                  "[start time] - [Allusion2] - [Explanation for Allusion2] - [end time]",
                  "...",
                  "[end of response]",
                  "<</SYS>>",
                  "[start of dialogue excerpt:]",
                  ...subtitle,
                  "[end of dialogue excerpt] [/INST]",
                  "[end of prompt]",
                ]);

          // console.log(textInput);

          const payload = {
            text_input: textInput,
            max_tokens: 1000,
            bad_words: [],
            stop_words: [],
            pad_id: 2,
            end_id: 2,
          };

          const startTime = Date.now();
          const response = await axios.post(
            `${process.env.REACT_APP_LLM_SERVICE_URL}`,
            // "/v2/models/ensemble/generate"
            payload
          );
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          console.log(`response time for ${index}: ${responseTime}ms`);

          const allusion = response.data.text_output;
          // console.log(JSON.stringify(allusion, null, 2));

          const lines = allusion.split("\n");

          setTextData((prevTextData) => {
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];

              const timeRegex =
                /\((\d{2}:\d{2}:\d{2},\d{3}) - (\d{2}:\d{2}:\d{2},\d{3})\)/;
              const match = line.match(timeRegex);

              if (match) {
                // console.log(match);
                const [startTime, endTime] = [match[1], match[2]];
                const allusion1 = line
                  .slice(0, match.index)
                  .match(/"([^"]*)"/)[1];
                const allusion2 = line.slice(match.index + match[0].length);

                const formattedStartTime = formatTime(startTime);
                const formattedEndTime = formatTime(endTime);

                console.log(formattedStartTime, formattedEndTime, allusion1);
                prevTextData = prevTextData.map((item) => {
                  if (
                    item.startTime === formattedStartTime &&
                    item.endTime === formattedEndTime
                  ) {
                    return {
                      ...item,
                      allusion: allusion1 + allusion2,
                    };
                  }
                  return item;
                });
              }
            }
            return prevTextData;
          });
        } catch (error) {
          console.error("An error occurred:", index, error);
        }
      });

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
      <h1 className="title">Demo of Allusion-Explaining LLM Services</h1>
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
