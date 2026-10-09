// Renders a text where `code` and **bold** mark inline formatting.
export default function RichText({ text }) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**')) return <b key={i}>{part.slice(2, -2)}</b>;
    return part;
  });
}
