export function calculateErrors(
  original: string,
  typed: string
): number {
  let totalErrors = 0;

  for (let i = 0; i < Math.min(original.length, typed.length); i++) {
    const originalWord = original[i];
    const typedWord = typed[i];

    const minLength = Math.min(originalWord.length, typedWord.length);
    for (let j = 0; j < minLength; j++) {
      if (originalWord[j] !== typedWord[j]) totalErrors++;
    }

    if (typedWord.length < originalWord.length)
      totalErrors += originalWord.length - typedWord.length;

    if (typedWord.length > originalWord.length)
      totalErrors += typedWord.length - originalWord.length;
  }

  return totalErrors;
}
