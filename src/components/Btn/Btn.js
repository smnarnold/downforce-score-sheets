import './Btn.scss';

export default function Btn({ children, color = "red", callback, ...rest }) {
  return (
    <button className={`btn btn--${color}`} {...rest} onClick={callback}>
      {children}
    </button>
  );
}