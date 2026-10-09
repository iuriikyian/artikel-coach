// Default number of correct guesses in a row needed for a word to count as learned.
export const DEFAULT_REQUIRED_STREAK = 3;

/**
 * Whether `word` is learned: its streak of consecutive correct guesses has
 * reached `requiredStreak`. Derived rather than stored, so changing the
 * setting applies to all words at once. Words learned before streaks were
 * tracked (no `streak`, `learned: true`) stay learned.
 */
export function isLearned(word, requiredStreak) {
  if (word.streak === undefined) return Boolean(word.learned);
  return word.streak >= requiredStreak;
}

/**
 * Word after guessing `article`: the guess is added to its history and the
 * streak of consecutive correct guesses grows or resets to 0.
 */
export function applyGuess(word, article) {
  const correct = word.article === article;
  return {
    ...word,
    history: [...(word.history ?? []), { guess: article, correct, at: new Date().toISOString() }],
    streak: correct ? (word.streak ?? 0) + 1 : 0,
  };
}

// Word with its learning progress cleared; the guess history is kept.
export function resetWord(word) {
  const { learned, ...rest } = word;
  return { ...rest, streak: 0 };
}
