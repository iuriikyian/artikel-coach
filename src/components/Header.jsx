import { EditIcon, SettingsIcon } from './Icons.jsx';
import { isLearned } from '../model/learning.js';
import { useTexts } from '../i18n/index.js';

export default function Header({ sets, activeSet, onSelectSet, onEditSets, onSettings, requiredStreak }) {
  const texts = useTexts();
  const total = activeSet?.words.length ?? 0;
  const learned = activeSet?.words.filter((w) => isLearned(w, requiredStreak)).length ?? 0;
  const percent = total === 0 ? 0 : Math.round((learned / total) * 100);

  return (
    <header className="header">

      <div className="header-controls">
        <select
          value={activeSet?.id ?? ''}
          onChange={(e) => onSelectSet(e.target.value)}
          disabled={sets.length === 0}
          aria-label={texts.header.wordSet}
        >
          {sets.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <button className="icon-btn" onClick={onEditSets} title={texts.header.editSets} aria-label={texts.header.editSets}>
          <EditIcon />
        </button>
        <button className="icon-btn" onClick={onSettings} title={texts.header.settings} aria-label={texts.header.settings}>
          <SettingsIcon />
        </button>
      </div>

      <div className="progress" title={texts.header.progress(learned, total)}>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="progress-label">{percent}%</span>
      </div>
    </header>
  );
}
