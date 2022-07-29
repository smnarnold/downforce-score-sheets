import {useState, useEffect} from 'react';
import './BetCar.scss';

export default function BetCar({ id, name, index, currentBet, onBetChange }) {
  const pfx = "bet-item";
  const [check, setCheck] = useState(currentBet === id);
  const theme = id != null ? `car-theme-${id}` : "";

  useEffect(() => {
    setCheck(currentBet === id);
  }, [currentBet, id]);

  function toggleRadio(event) {
    setCheck(!check);
    onBetChange(event.target.value);
  }

  return (
    <label key={id} className={`${pfx} ${check ? pfx + "--checked" : ""} ${theme}`}>
      <input
        type="radio"
        name={`bet-${index}`}
        value={id}
        className={`${pfx}__radio`}
        onChange={toggleRadio}
      />

      {name}
    </label>
  );
}