import { createContext, useContext } from 'react';
import { en } from './en.js';
import { de } from './de.js';

// UI languages: code -> name shown in its own language, texts.
export const LANGUAGES = {
  en: { name: 'English', texts: en },
  de: { name: 'Deutsch', texts: de },
};

export const DEFAULT_LANGUAGE = 'en';

// Texts for `language`, falling back to the default for unknown codes.
export function textsFor(language) {
  return (LANGUAGES[language] ?? LANGUAGES[DEFAULT_LANGUAGE]).texts;
}

export const TextsContext = createContext(textsFor(DEFAULT_LANGUAGE));

// Texts for the current UI language.
export function useTexts() {
  return useContext(TextsContext);
}
