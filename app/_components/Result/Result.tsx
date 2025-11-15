import React, { useMemo } from "react";

import {
  Errors,
  ResultsModel,
  StatsModel,
} from "@/models/stats.model";
import { calculateErrors } from "@/utils/calculateErrors";
import { TypeAreaChart } from "./ResultChart";

const Result = ({
  stats,
  words,
  rest,
}: {
  stats: StatsModel[];
  words: string[];
  rest: () => void;
}) => {
  const results = useMemo(() => {
    const results: Array<Errors & ResultsModel> = [];
    stats.forEach((item, i, arr) => {
      const prevStat = arr?.[i - 1]; // Get the last entry in stats

      const typedWord = item.allWords.slice(
        prevStat?.allWords.length || 0
      ); // Get newly typed words
      const allWordsArr = item.allWords.split(" ");
      // Calculate errors
      const {
        totalErrors: totalErrors,
        extra,
        missed,
        incorrect,
        correct,
        total,
      } = calculateErrors(
        words.slice(0, allWordsArr.length),
        allWordsArr
      );

      const errors = totalErrors - results?.[i - 1]?.totalErrors || 0;
      const elapsed = Math.abs(stats.length - (item.time - 1));
      const totalWpm = Math.round((correct / 5) * (60 / elapsed));
      const totalRaw = Math.round((total / 5) * (60 / elapsed));
      const totalAccuracy =
        total > 0 ? Math.round((correct / total) * 100) : 100;
      results[i] = {
        total,
        totalWpm,
        correct,
        errors,
        typedWord,
        totalAccuracy,
        totalRaw,
        missed,
        extra,
        incorrect,
        totalErrors,
      };
    });

    return results;
  }, [stats, words]);

  const lastItem = results.at(-1)!;

  console.log(stats);
  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-4 container p-4 justify-items-center">
      <div className="grid w-fit">
        <div>
          <div className="text-[2rem] leading-6 text-sub-color w-fit">
            wpm
          </div>
          <div className="text-[4rem] leading-16 text-main-color w-fit">
            {lastItem.totalWpm}
          </div>
        </div>
        <div>
          <div className="text-[2rem] leading-6 text-sub-color w-fit">
            acc
          </div>
          <div className="text-[4rem] leading-16 text-main-color w-fit">
            {lastItem.totalAccuracy}%
          </div>
        </div>
      </div>

      <TypeAreaChart results={results} />
      <div className="grid col-span-full grid-cols-3 md:grid-cols-6 w-full justify-items-center">
        <div>
          <div className="text-base text-sub-color">wpm</div>
          <div className="text-3xl  text-main-color ">
            {lastItem.totalWpm}
          </div>
        </div>
        <div>
          <div className="text-base text-sub-color">raw</div>
          <div className="text-3xl  text-main-color ">
            {lastItem.totalRaw}
          </div>
          s
        </div>
        <div>
          <div className="text-base text-sub-color">time</div>
          <div className="text-3xl  text-main-color ">
            {stats[0].time}s
          </div>
        </div>
        <div>
          <div className="text-base text-sub-color">characters</div>
          <div className="text-3xl  text-main-color ">
            {lastItem.correct}/{lastItem.incorrect}/{lastItem.extra}/
            {lastItem.missed}
          </div>
        </div>
        <div>
          <div className="text-base text-sub-color">accuracy</div>
          <div className="text-3xl  text-main-color ">
            {lastItem.totalAccuracy}
          </div>
        </div>
        <div>
          <div className="text-base text-sub-color">errors</div>
          <div className="text-3xl  text-main-color ">
            {lastItem.totalErrors}
          </div>
        </div>
      </div>
      <button className="mx-auto col-span-full" onClick={rest}>
        Reset
      </button>
    </div>
  );
};

export default Result;
