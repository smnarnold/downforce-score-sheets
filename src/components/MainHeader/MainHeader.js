import './MainHeader.scss';
import logo from '../../images/downforce-logo.webp';

export default function MainHeader({ slideIndex = 0, slideTitle = "", onSlideChange }) {
  const pfx = `main-header`;
  let backBtn = "",
    spacer = "";

  if (slideIndex > 0) {
    // Not on first slide
    backBtn = (
      <button
        className={`${pfx}__back-btn`}
        onClick={() => onSlideChange(slideIndex - 1)}
      >
        ↩
      </button>
    );
    spacer = <div className={`${pfx}__spacer`} />;
  }

  return (
    <header className={pfx}>
      <div className={`${pfx}__logo`}>
        <img src={logo} alt="Downforce" />
      </div>

      <nav className={`${pfx}__nav`}>
        {backBtn}
        <h2 className={`${pfx}__title`}>{slideTitle}</h2>
        {spacer}
      </nav>
    </header>
  );
}