import "./Instructions.scss";

export default function Instructions({ text }) {
  if (text.trim.length === 0) return;

  return <p className="instructions">{text}</p>;
}
