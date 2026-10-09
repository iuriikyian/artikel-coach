import { useState } from 'react';
import { REQUIRED_STREAK_RANGE } from '../settings.js';
import { SaveIcon } from './Icons.jsx';
import { LANGUAGES, useTexts } from '../i18n/index.js';
import { version, author, license } from '../../package.json';

export default function Settings({ settings, onSave, onClose }) {
  const texts = useTexts();
  const [language, setLanguage] = useState(settings.language);
  const [requiredStreak, setRequiredStreak] = useState(String(settings.requiredStreak));

  const { min, max } = REQUIRED_STREAK_RANGE;
  const value = Number(requiredStreak);
  const valid = Number.isInteger(value) && value >= min && value <= max;

  function save() {
    if (!valid) return;
    onSave({ ...settings, language, requiredStreak: value });
  }

  return (
    <section className="page">
      <h2>{texts.settings.title}</h2>

      <label className="setting">
        <span>{texts.settings.language}</span>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {Object.entries(LANGUAGES).map(([code, { name }]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </label>

      <label className="setting">
        <span>{texts.settings.requiredStreak}</span>
        <input
          type="number"
          min={min}
          max={max}
          step={1}
          value={requiredStreak}
          onChange={(e) => setRequiredStreak(e.target.value)}
        />
      </label>
      {!valid && <p className="error">{texts.settings.requiredStreakInvalid(min, max)}</p>}

      <div className="page-actions">
        <button className="secondary" onClick={onClose}>{texts.settings.close}</button>
        <button className="icon-btn" onClick={save} disabled={!valid} title={texts.settings.save} aria-label={texts.settings.save}>
          <SaveIcon />
        </button>
      </div>

      <h3 className="about-title">{texts.settings.about}</h3>
      <dl className="about">
        <dt>{texts.settings.version}</dt>
        <dd>{version}</dd>
        <dt>{texts.settings.author}</dt>
        <dd>{author.name}</dd>
        <dt>{texts.settings.license}</dt>
        <dd>{license}</dd>
      </dl>
    </section>
  );
}
