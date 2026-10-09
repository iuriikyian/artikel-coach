import { useState } from 'react';
import { WordSet } from '../model/WordSet.js';
import { SaveIcon } from './Icons.jsx';
import { useTexts } from '../i18n/index.js';
import RichText from './RichText.jsx';

export default function WordSetEditor({ title, initialText = '', existingNames, onSave, onCancel }) {
  const texts = useTexts();
  const [text, setText] = useState(initialText);
  const [error, setError] = useState(null);

  function save() {
    try {
      const wordSet = WordSet.parse(text, texts.parser);
      if (wordSet.words.length === 0) throw new Error(texts.editor.noWords);
      if (existingNames.includes(wordSet.id)) {
        throw new Error(texts.editor.duplicateName(wordSet.id));
      }
      onSave(wordSet);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <section className="page">
      <h2>{title}</h2>
      <p className="hint">
        <RichText text={texts.editor.hint} />
      </p>

      <textarea
        className="wordset-text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError(null);
        }}
        placeholder={texts.editor.placeholder}
        spellCheck={false}
        autoFocus
      />

      {error && <p className="error">{error}</p>}

      <div className="page-actions">
        <button className="secondary" onClick={onCancel}>{texts.editor.cancel}</button>
        <button className="icon-btn" onClick={save} disabled={!text.trim()} title={texts.editor.save} aria-label={texts.editor.save}>
          <SaveIcon />
        </button>
      </div>
    </section>
  );
}
