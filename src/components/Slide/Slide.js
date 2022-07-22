import './Slide.scss';

export default function Slide({ type = "default", children }) {
  return <section className={`slide slide--${type}`}>{children}</section>;
}