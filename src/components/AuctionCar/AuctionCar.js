import React from 'react';
import './AuctionCar.scss';

export default function AuctionCar({ id, name, initialValue = 0, onBidChange }) {
  const pfx = "auction-item";
  const [check, setCheck] = React.useState(false);
  const [price, setPrice] = React.useState(initialValue);
  const theme = id != null ? `car-theme-${id}` : "";

  React.useEffect(() => onBidChange({ price, id }), [id, price]);

  function handleValueChange(event) {
    setPrice(parseInt(event.target.value));
  }

  function toggleCar() {
    setPrice(check ? 0 : 1);
    setCheck(!check);
  }

  return (
    <li key={name} className={`${pfx} ${check ? pfx + "--checked" : ""}`}>
      <label className={`${pfx}__label`}>
        <input type="checkbox" onChange={toggleCar} className={`${pfx}__cb`} />
        <div className={`${pfx}__name ${theme}`}>{name}</div>
      </label>

      <div className={`${pfx}__price`}>
        <input
          type="range"
          min="1"
          max="6"
          step="1"
          defaultValue={initialValue}
          onChange={handleValueChange}
          value={price}
          className={`${pfx}__range`}
          disabled={!check}
        />
        <output
          className={`${pfx}__output`}
          style={{ left: `${Math.max(0, price - 1) * 18 + 5}%` }}
        >
          {price}
        </output>
      </div>
    </li>
  );
}