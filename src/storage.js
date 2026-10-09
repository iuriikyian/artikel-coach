import { WordSet } from './model/WordSet.js';
import { articlesOf } from './articles.js';
import { en } from './i18n/en.js';

const LEGACY_WORDS_KEY = 'de-artikel.words';

// Initial word sets: the bundled sample, plus the old flat word list (if any) as "Default" in the UI language.
export function initialSets(texts = en) {
  const sets = [setFromWordSet(WordSet.loadSample())];

  let legacyWords = [];
  try {
    legacyWords = JSON.parse(localStorage.getItem(LEGACY_WORDS_KEY)) ?? [];
  } catch {
    // ignore unreadable legacy data
  }
  if (legacyWords.length > 0) {
    const articles = [...new Set(legacyWords.map((w) => w.article))];
    sets.push(createSet(texts.app.defaultSetName, articles, legacyWords.map((w) => ({ learned: false, ...w }))));
  }
  return sets;
}

/**
 * Stored set from a parsed WordSet; the set is named after its "meta:id:".
 * When `previous` is given (editing an existing set), the set keeps its id and
 * words that are still present keep their progress.
 */
export function setFromWordSet(wordSet, previous) {
  const previousWords = new Map(previous?.words.map((w) => [`${w.article} ${w.noun}`, w]));
  const words = wordSet.words.map((w) => {
    const old = previousWords.get(`${w.article} ${w.noun}`);
    return old ? { ...w, ...old } : { ...w, id: crypto.randomUUID() };
  });
  return previous
    ? { ...previous, name: wordSet.id, articles: wordSet.articles, words }
    : createSet(wordSet.id, wordSet.articles, words);
}

// Plain-text form of a stored set, in the same format WordSet.parse reads.
export function setToText(set) {
  return [
    `meta:id:${set.name}`,
    `meta:a:${articlesOf(set).join(' ')}`,
    ...set.words.map((w) => `${w.article} ${w.noun}`),
  ].join('\n');
}

function createSet(name, articles, words = []) {
  return { id: crypto.randomUUID(), name, articles, words };
}
