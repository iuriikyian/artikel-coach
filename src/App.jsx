import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage.js';
import { initialSets, setFromWordSet, setToText } from './storage.js';
import { articlesOf } from './articles.js';
import { DEFAULT_SETTINGS, SETTINGS_KEY } from './settings.js';
import { TextsContext, textsFor } from './i18n/index.js';
import Title from './components/Title.jsx';
import Header from './components/Header.jsx';
import SetsList from './components/SetsList.jsx';
import WordSetEditor from './components/WordSetEditor.jsx';
import Practice from './components/Practice.jsx';
import Settings from './components/Settings.jsx';

export default function App() {
  const [storedSettings, setSettings] = useLocalStorage(SETTINGS_KEY, DEFAULT_SETTINGS);
  // Stored settings may predate newer options; fill those from the defaults.
  const settings = { ...DEFAULT_SETTINGS, ...storedSettings };
  const texts = textsFor(settings.language);
  const [sets, setSets] = useLocalStorage('de-artikel.sets', () => initialSets(texts));
  const [activeSetId, setActiveSetId] = useLocalStorage('de-artikel.activeSetId', null);

  useEffect(() => {
    document.title = texts.app.title;
    document.documentElement.lang = settings.language;
  }, [texts, settings.language]);

  // 'practice' | 'sets' (list of word sets) | 'editor' (word set editor) | 'settings'
  const [page, setPage] = useState('practice');
  // Set open in the editor; null when creating a new one.
  const [editingSetId, setEditingSetId] = useState(null);

  // Fall back to the first set if the stored one no longer exists.
  const activeSet = sets.find((s) => s.id === activeSetId) ?? sets[0];

  function updateSet(id, changes) {
    setSets(sets.map((s) => (s.id === id ? { ...s, ...changes } : s)));
  }

  const editingSet = sets.find((s) => s.id === editingSetId);

  function openEditor(setId) {
    setEditingSetId(setId);
    setPage('editor');
  }

  function saveWordSet(wordSet) {
    if (editingSet) {
      const set = setFromWordSet(wordSet, editingSet);
      setSets(sets.map((s) => (s.id === set.id ? set : s)));
    } else {
      const set = setFromWordSet(wordSet);
      setSets([...sets, set]);
      setActiveSetId(set.id);
    }
    setPage('sets');
  }

  return (
    <TextsContext.Provider value={texts}>
      <main className="app">
        <Title />
        {page === 'practice' && (
          <Header
            sets={sets}
            activeSet={activeSet}
            onSelectSet={setActiveSetId}
            onEditSets={() => setPage('sets')}
            onSettings={() => setPage('settings')}
            requiredStreak={settings.requiredStreak}
          />
        )}

        {page === 'sets' ? (
          <SetsList
            sets={sets}
            onEdit={openEditor}
            onDelete={(id) => setSets(sets.filter((s) => s.id !== id))}
            onCancel={() => setPage('practice')}
            onCreate={() => openEditor(null)}
          />
        ) : page === 'settings' ? (
          <Settings
            settings={settings}
            onSave={(newSettings) => {
              setSettings(newSettings);
              setPage('practice');
            }}
            onClose={() => setPage('practice')}
          />
        ) : page === 'editor' ? (
          <WordSetEditor
            key={editingSetId}
            title={editingSet ? texts.editor.editTitle(editingSet.name) : texts.editor.newTitle}
            initialText={editingSet ? setToText(editingSet) : ''}
            existingNames={sets.filter((s) => s !== editingSet).map((s) => s.name)}
            onSave={saveWordSet}
            onCancel={() => setPage('sets')}
          />
        ) : activeSet ? (
          <Practice
            key={activeSet.id}
            words={activeSet.words}
            articles={articlesOf(activeSet)}
            requiredStreak={settings.requiredStreak}
            onChange={(words) => updateSet(activeSet.id, { words })}
          />
        ) : (
          <p className="empty">{texts.app.noSets}</p>
        )}
      </main>
    </TextsContext.Provider>
  );
}
