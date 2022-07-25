import {useState} from 'react';
import './AuctionCar.scss';

export default function AuctionCar({ id, name, initialValue = 0, onBidChange }) {
  const pfx = "auction-item";
  const [check, setCheck] = useState(false);
  const [price, setPrice] = useState(initialValue);
  const theme = id != null && `car-theme-${id}`;

  function handleValueChange(event) {
    setPrice(parseInt(event.target.value));
    onBidChange({price, id})
  };

  function toggleCar() {
    setPrice(check ? 0 : 1);
    setCheck(!check);
    onBidChange({price, id})
  };

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