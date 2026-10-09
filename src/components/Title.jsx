import { useTexts } from '../i18n/index.js';

export default function Title() {
  const texts = useTexts();
  return <h1 className="title">{texts.app.title}</h1>;
}
