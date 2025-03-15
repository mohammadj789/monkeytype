import React, { useMemo } from "react";

import { ResultsModel, StatsModel } from "@/models/stats.model";
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
  const results: ResultsModel[] =
    useMemo(() => {
      const items = stats.map((item, i, arr) => {
        const prevStat = arr?.[i - 1]; // Get the last entry in stats

        const typedWord = item.allWords.slice(
          prevStat?.allWords.length || 0
        ); // Get newly typed words

        // Calculate errors
        const errors = calculateErrors(
          words.join(" ").slice(prevStat?.allWords.length || 0),
          typedWord
        );
        const allErrors = calculateErrors(
          words.join(" "),
          item.allWords
        );

        const totalWpm = Math.round(
          ((item.allWords.length - allErrors) / 5) *
            (60 / Math.abs(stats.length - (item.time - 1)))
        );
        const raw = Math.round((typedWord.length / 5) * (60 / 1));
        const totalRaw = Math.round(
          (item.allWords.length / 5) *
            Math.abs(stats.length - (item.time - 1))
        );
        const totalAccuracy = Math.round(
          ((item.allWords.length - allErrors) /
            item.allWords.length) *
            100
        );
        return {
          totalWpm,
          allErrors,
          errors,
          typedWord,
          raw,
          totalAccuracy,
          totalRaw,
        };
      });

      return items;
    }, [stats, words]) || [];
  const lastItem = results[results.length - 1];
  return (
    <div className=" grid md:grid-cols-[auto_1fr] gap-4 container p-4">
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
      <button className="mx-auto" onClick={rest}>
        Reset
      </button>
    </div>
  );
};

export default Result;
