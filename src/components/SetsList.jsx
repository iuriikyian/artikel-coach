import { articlesOf } from '../articles.js';
import { EditIcon, PlusIcon } from './Icons.jsx';
import { useTexts } from '../i18n/index.js';

export default function SetsList({ sets, onEdit, onDelete, onCancel, onCreate }) {
  const texts = useTexts();
  return (
    <section className="page">
      <h2>{texts.setsList.title}</h2>

      {sets.length === 0 ? (
        <p className="empty">{texts.setsList.empty}</p>
      ) : (
        <ul className="word-list">
          {sets.map((s) => (
            <li key={s.id}>
              <span className="set-name">{s.name}</span>
              <span className="set-articles">{articlesOf(s).join(texts.setsList.articlesSeparator)}</span>
              <span className="set-count">{texts.setsList.wordCount(s.words.length)}</span>
              <button className="icon-btn" onClick={() => onEdit(s.id)} title={texts.setsList.edit} aria-label={texts.setsList.editSet(s.name)}>
                <EditIcon />
              </button>
              <button
                className="remove"
                aria-label={texts.setsList.deleteSet}
                onClick={() => confirm(texts.setsList.confirmDelete(s.name, s.words.length)) && onDelete(s.id)}
              >
                {texts.setsList.deleteIcon}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="page-actions">
        <button className="secondary" onClick={onCancel}>{texts.setsList.close}</button>
        <button className="icon-btn" onClick={onCreate} title={texts.setsList.create} aria-label={texts.setsList.create}>
          <PlusIcon />
        </button>
      </div>
    </section>
  );
}
