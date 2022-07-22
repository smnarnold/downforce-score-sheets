import React from 'react';
import './BetCar.scss';

export default function BetCar({ id, name, index, currentBet, onBetChange }) {
  const pfx = "bet-item";
  const [check, setCheck] = React.useState(currentBet == id);
  const theme = id != null ? `car-theme-${id}` : "";

  React.useEffect(() => {
    setCheck(currentBet == id);
  }, [currentBet, id]);

  function toggleRadio(event) {
    setCheck(!check);
    onBetChange(event.target.value);
  }

  return (
    <li key={id} className={`${pfx} ${check ? pfx + "--checked" : ""}`}>
      <label className={`${pfx}__label`}>
        <input
          type="radio"
          name={`bet-${index}`}
          value={id}
          className={`${pfx}__radio`}
          onChange={toggleRadio}
        />

        <div className={`${pfx}__name ${theme}`}>{name}</div>
      </label>
    </li>
  );
}