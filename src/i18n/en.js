/**
 * English UI texts and labels. Functions build texts that contain values.
 * In texts rendered with <RichText>, `code` and **bold** mark formatting.
 * Other languages must have the same keys.
 */
export const en = {
  app: {
    title: "Artikel-Coach",
    noSets: 'No word sets. Click "Edit sets" to create one.',
    defaultSetName: "Default",
  },

  header: {
    wordSet: "Word set",
    editSets: "Edit sets",
    settings: "Settings",
    progress: (learned, total) => `${learned} of ${total} learned`,
  },

  practice: {
    noWords: 'This set has no words. Click "Edit sets" to add some.',
    allLearnedIcon: "🎉",
    allLearned: "All words in this set are learned.",
    startOver: "Start over",
    wrongAnswer: (answer, article, noun) =>
      `Not "${answer}" — it's **${article}** ${noun}.`,
    next: "Next",
    streak: (value, required) => `${value} of ${required} correct in a row`,
  },

  setsList: {
    title: "Word sets",
    empty: "No word sets yet.",
    wordCount: (count) => `${count} words`,
    articlesSeparator: " / ",
    edit: "Edit",
    editSet: (name) => `Edit ${name}`,
    deleteSet: "Delete set",
    deleteIcon: "×",
    confirmDelete: (name, count) => `Delete "${name}" and its ${count} words?`,
    close: "Close",
    create: "Create word set",
  },

  editor: {
    newTitle: "New word set",
    editTitle: (name) => `Edit "${name}"`,
    hint: "Paste a word set: `meta:id:` line with the set name, `meta:a:` line with the allowed articles, then one `article noun` per line. Lines starting with `#` are comments.",
    placeholder:
      "meta:id:my-wordset\nmeta:a:der die das\ndas Mädchen\nder Junge\ndie Butter",
    noWords: "The word set has no words",
    duplicateName: (name) =>
      `A word set "${name}" already exists — change the "meta:id:" line`,
    cancel: "Cancel",
    save: "Save",
  },

  parser: {
    badLine: (lineNumber, line) =>
      `Line ${lineNumber}: expected "<article> <noun>", got "${line}"`,
    missingArticles: 'Missing "meta:a:" line with the allowed articles',
    unknownArticle: (lineNumber, article, articles) =>
      `Line ${lineNumber}: unknown article "${article}", expected one of ${articles.join(", ")}`,
  },

  settings: {
    title: "Settings",
    language: "Language",
    requiredStreak: "Correct guesses in a row to learn a word",
    requiredStreakInvalid: (min, max) =>
      `Enter a whole number from ${min} to ${max}.`,
    close: "Close",
    save: "Save",
    about: "About",
    version: "Version",
    author: "Author",
    license: "License",
  },
};
