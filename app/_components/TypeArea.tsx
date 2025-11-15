"use client";

import { Words } from "@/models/englishwords.model";
import React, { useEffect, useState } from "react";

import { StatsModel } from "@/models/stats.model";
import TypeAreainput from "./TypeAreainput";
import Result from "./Result/Result";
const times = [5, 10, 15, 30, 60];
const TypeArea = ({ data }: { data: Words }) => {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState<false | number>(false);
  const [stats, setStats] = useState<StatsModel[]>([]);
  const [timeBase, setTimeBase] = useState<number>(15);
  const finishedTyping = () => {
    setTimer(false);
    setText("");
  };

  useEffect(() => {
    let interval = null;
    console.log(timer);
    if (typeof timer === "number" && timer > 0)
      // Start the timer countdown
      interval = setInterval(() => {
        setTimer((prev) => (prev as number) - 1);
      }, 1000);
    else if (timer === 0) finishedTyping(); // Call the function when the timer reaches 0

    return () => {
      if (interval) clearInterval(interval); // Clean up the interval
    };
  }, [timer]);
  useEffect(() => {
    if (typeof timer === "number" && timer > 0) {
      setStats((prvs) => {
        const prv = [...prvs];
        const PrevWordsAr = prv.slice(-1)?.[0]; // Get the last entry in stats

        const typedWord = text.slice(
          PrevWordsAr?.allWords.length || 0
        );
        const index = prv.findIndex((item) => item.time === timer);
        if (index > -1) {
          prv[index] = {
            allWords: text,
            typedWord: prv[index].typedWord + typedWord,
            time: timer,
          };
        } else
          prv.push({
            allWords: text,
            typedWord,
            time: timer,
          });

        return prv;
      });
    }
    if (text.length === 1) {
      setTimer(timeBase); // Reset the timer to TIME seconds when typing starts
    }
  }, [text, timer, data.words, timeBase]);
  const ResetStats = () => {
    setStats([]);
    finishedTyping();
  };
  console.log(stats, "Sdsdsd");
  return (
    <div className="container">
      <div className="flex justify-between">
        {stats.length === timeBase ? (
          <button onClick={ResetStats}>Reset</button>
        ) : (
          <span className="text-main-color text-2xl">
            {timer === false ? timeBase : timer}{" "}
          </span>
        )}

        {timer === false && (
          <div className="flex gap-1">
            {times.map((item) => (
              <button
                onClick={() => {
                  setTimeBase(item);
                  ResetStats();
                }}
                className="text-main-color bg-neutral-700 px-2 rounded-sm"
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      {stats.length === timeBase ? (
        <Result stats={stats} words={data.words} />
      ) : (
        <TypeAreainput
          words={data.words}
          text={text}
          setText={setText}
        />
      )}
    </div>
  );
};

export default TypeArea;
