import { useEffect, useState } from 'react';
import { articleColor } from '../articles.js';
import { applyGuess, isLearned, resetWord } from '../model/learning.js';
import { useTexts } from '../i18n/index.js';
import RichText from './RichText.jsx';

// Random unlearned word, avoiding the previous one when there's another choice.
function pickWord(words, requiredStreak, previousId) {
  const pool = words.filter((w) => !isLearned(w, requiredStreak));
  const others = pool.filter((w) => w.id !== previousId);
  const candidates = others.length > 0 ? others : pool;
  return candidates[Math.floor(Math.random() * candidates.length)]?.id ?? null;
}

export default function Practice({ words, articles, requiredStreak, onChange }) {
  const texts = useTexts();
  const [currentId, setCurrentId] = useState(() => pickWord(words, requiredStreak));
  const [answer, setAnswer] = useState(null);

  const current = words.find((w) => w.id === currentId);
  const isCorrect = answer !== null && answer === current?.article;

  function next() {
    setAnswer(null);
    setCurrentId(pickWord(words, requiredStreak, currentId));
  }

  function choose(article) {
    if (!current || answer) return;
    setAnswer(article);
    onChange(words.map((w) => (w.id === current.id ? applyGuess(w, article) : w)));
  }

  // Correct answers move on automatically; wrong ones wait for "Next".
  useEffect(() => {
    if (!isCorrect) return;
    const timer = setTimeout(next, 800);
    return () => clearTimeout(timer);
  });

  // Words were added while nothing was left to practice.
  useEffect(() => {
    if (!current && words.some((w) => !isLearned(w, requiredStreak))) setCurrentId(pickWord(words, requiredStreak));
  }, [current, words, requiredStreak]);

  function resetProgress() {
    onChange(words.map(resetWord));
    setAnswer(null);
    setCurrentId(null);
  }

  return (
    <>
      <section className="card-area">
        {words.length === 0 ? (
          <div className="card">
            <p className="empty">{texts.practice.noWords}</p>
          </div>
        ) : !current ? (
          <div className="card">
            <p className="card-word">{texts.practice.allLearnedIcon}</p>
            <p>{texts.practice.allLearned}</p>
            <button onClick={resetProgress}>{texts.practice.startOver}</button>
          </div>
        ) : (
          <div className={`card ${answer ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
            <p className="card-word">
              {answer && <span className={`article ${articleColor(articles, current.article)}`}>{current.article} </span>}
              {current.noun}
            </p>
            <Streak value={current.streak ?? 0} required={requiredStreak} />
            {answer && !isCorrect && (
              <>
                <p>
                  <RichText text={texts.practice.wrongAnswer(answer, current.article, current.noun)} />
                </p>
                <button onClick={next}>{texts.practice.next}</button>
              </>
            )}
          </div>
        )}
      </section>

      <footer className="footer">
        {articles.map((a) => (
          <button
            key={a}
            className={`article-btn ${articleColor(articles, a)}`}
            onClick={() => choose(a)}
            disabled={!current || answer !== null}
          >
            {a}
          </button>
        ))}
      </footer>
    </>
  );
}

// Dots showing correct guesses in a row towards `required`.
function Streak({ value, required }) {
  const texts = useTexts();
  return (
    <p className="streak" title={texts.practice.streak(value, required)}>
      {Array.from({ length: required }, (_, i) => (
        <span key={i} className={i < value ? 'filled' : ''} />
      ))}
    </p>
  );
}
