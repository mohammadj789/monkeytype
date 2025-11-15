import { Errors } from "@/models/stats.model";

export function calculateErrors(
  original: string[],
  typed: string[]
): Errors {
  let totalErrors = 0;
  let missed = 0;
  let extra = 0;
  let incorrect = 0;
  let correct = 0;
  let total = 0;
  original.forEach((word, i) => {
    const typedWord = typed[i];
    if (typedWord) {
      for (
        let j = 0;
        j < Math.max(typed[i].length, word.length);
        j++
      ) {
        total++;
        if (typedWord?.[j] !== word?.[j]) totalErrors++;
        if (!typedWord?.[j] && word?.[j]) missed++;
        if (typedWord?.[j] && !word?.[j]) extra++;
        if (
          typedWord?.[j] &&
          word?.[j] &&
          typedWord?.[j] !== word?.[j]
        )
          incorrect++;
        if (typedWord?.[j] === word?.[j]) correct++;
      }
    }
  });

  return { totalErrors, extra, missed, incorrect, correct, total };
}
