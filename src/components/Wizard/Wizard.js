import './Wizard.scss';

export default function Wizard({ slideIndex, slidesTotal, children }) {
  const slideWidth = `${slidesTotal * 100}%`;
  const wizardTranslateX = `${(slideIndex / slidesTotal) * -100}%`;

  return (
    <div
      className="wizard"
      style={{
        width: slideWidth,
        transform: `translateX(${wizardTranslateX})`,
        gridTemplateColumns: `repeat(${slidesTotal}, 1fr)`
      }}
    >
      {children}
    </div>
  );
}