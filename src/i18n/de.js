/** German UI texts; same keys as en.js. */
export const de = {
  app: {
    title: "Artikel-Coach",
    noSets:
      "Keine Wortsets. Klicke auf „Wortsets bearbeiten“, um eines anzulegen.",
    defaultSetName: "Standard",
  },

  header: {
    wordSet: "Wortset",
    editSets: "Wortsets bearbeiten",
    settings: "Einstellungen",
    progress: (learned, total) => `${learned} von ${total} gelernt`,
  },

  practice: {
    noWords:
      "Dieses Set enthält keine Wörter. Klicke auf „Wortsets bearbeiten“, um welche hinzuzufügen.",
    allLearnedIcon: "🎉",
    allLearned: "Alle Wörter in diesem Set sind gelernt.",
    startOver: "Von vorn beginnen",
    wrongAnswer: (answer, article, noun) =>
      `Nicht „${answer}“ – richtig ist **${article}** ${noun}.`,
    next: "Weiter",
    streak: (value, required) => `${value} von ${required} richtig in Folge`,
  },

  setsList: {
    title: "Wortsets",
    empty: "Noch keine Wortsets.",
    wordCount: (count) => `${count} Wörter`,
    articlesSeparator: " / ",
    edit: "Bearbeiten",
    editSet: (name) => `${name} bearbeiten`,
    deleteSet: "Set löschen",
    deleteIcon: "×",
    confirmDelete: (name, count) => `„${name}“ mit ${count} Wörtern löschen?`,
    close: "Schließen",
    create: "Wortset erstellen",
  },

  editor: {
    newTitle: "Neues Wortset",
    editTitle: (name) => `„${name}“ bearbeiten`,
    hint: "Füge ein Wortset ein: eine Zeile `meta:id:` mit dem Namen des Sets, eine Zeile `meta:a:` mit den erlaubten Artikeln, dann pro Zeile `Artikel Nomen`. Zeilen, die mit `#` beginnen, sind Kommentare.",
    placeholder:
      "meta:id:mein-wortset\nmeta:a:der die das\ndas Mädchen\nder Junge\ndie Butter",
    noWords: "Das Wortset enthält keine Wörter",
    duplicateName: (name) =>
      `Ein Wortset „${name}“ gibt es bereits – ändere die Zeile „meta:id:“`,
    cancel: "Abbrechen",
    save: "Speichern",
  },

  parser: {
    badLine: (lineNumber, line) =>
      `Zeile ${lineNumber}: „<Artikel> <Nomen>“ erwartet, gefunden: „${line}“`,
    missingArticles: "Die Zeile „meta:a:“ mit den erlaubten Artikeln fehlt",
    unknownArticle: (lineNumber, article, articles) =>
      `Zeile ${lineNumber}: unbekannter Artikel „${article}“, erwartet: ${articles.join(", ")}`,
  },

  settings: {
    title: "Einstellungen",
    language: "Sprache",
    requiredStreak: "Richtige Antworten in Folge, um ein Wort zu lernen",
    requiredStreakInvalid: (min, max) =>
      `Gib eine ganze Zahl von ${min} bis ${max} ein.`,
    close: "Schließen",
    save: "Speichern",
    about: "Über",
    version: "Version",
    author: "Autor",
    license: "Lizenz",
  },
};
