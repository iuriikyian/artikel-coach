import sampleText from "../data/sample-de.txt?raw";
import { applyGuess } from "./learning.js";
import { en } from "../i18n/en.js";

/**
 * A word set loaded from a text file:
 *
 *   meta:id:wordset-1
 *   meta:a:der die das
 *   # animals
 *   das Mädchen
 *   der Junge
 *
 * `meta:` lines hold set metadata (`id`, `a` = allowed articles, required), lines starting
 * with `#` are comments and ignored, every other non-empty line is "<article> <noun>".
 */
export class WordSet {
  constructor({ id, articles, words }) {
    this.id = id;
    this.articles = articles;
    this.words = words;
    this.queue = [];
  }

  /** `messages`: parser error texts in the UI language (English by default). */
  static parse(text, messages = en.parser) {
    const meta = {};
    const entries = [];

    text.split(/\r?\n/).forEach((raw, index) => {
      const line = raw.trim();
      if (!line || line.startsWith("#")) return;

      if (line.startsWith("meta:")) {
        const [, key, ...value] = line.split(":");
        meta[key] = value.join(":").trim();
        return;
      }

      const [article, ...nounParts] = line.split(/\s+/);
      const noun = nounParts.join(" ");
      if (!noun) throw new Error(messages.badLine(index + 1, line));
      entries.push({ article, noun, line: index + 1 });
    });

    if (!meta.a) throw new Error(messages.missingArticles);
    const articles = meta.a.split(/\s+/);
    const words = entries.map(({ article, noun, line }) => {
      if (!articles.includes(article)) {
        throw new Error(messages.unknownArticle(line, article, articles));
      }
      // Same noun can appear with different articles (der/die See), so the id includes both.
      return {
        id: `${article} ${noun}`,
        noun,
        article,
        history: [],
        streak: 0,
      };
    });

    return new WordSet({ id: meta.id ?? "wordset", articles, words });
  }

  static loadSample() {
    return WordSet.parse(sampleText);
  }

  /**
   * Next word in random order. Every word is returned once per round before
   * any repeats; a new shuffled round starts when the previous one runs out.
   */
  next() {
    if (this.words.length === 0) return null;
    if (this.queue.length === 0) this.queue = shuffle(this.words);
    return this.queue.pop();
  }

  /** Record a guess for `word` (history and streak) and return whether it was correct. */
  guess(word, article) {
    Object.assign(word, applyGuess(word, article));
    return word.article === article;
  }
}

// Fisher–Yates shuffle into a new array.
function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
