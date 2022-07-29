import {useState, useEffect} from 'react';
import Gauge from '../UI/Gauge';
import './AuctionCar.scss';

export default function AuctionCar({ id, name, initialValue = 0, onBidChange }) {
  const pfx = "auction-item";
  const [checked, setChecked] = useState(false);
  const [price, setPrice] = useState(initialValue);
  const theme = id != null && `car-theme-${id}`;

  useEffect(() => {
    /* Wait half a second without the user chnging the price before calling onBidChange */
    const timer = setTimeout(() => {
      onBidChange({price, id})
    }, 500);

    return () => clearTimeout(timer);
  }, [price, id]);

  function handlePriceChange(val) {
    setPrice(val);
  };

  function toggleCar() {
    setPrice(checked ? 0 : 1);
    setChecked(!checked);
  };

  return (
    <li key={name} className={`${pfx} ${checked ? pfx + "--checked" : ""} ${theme}`}>
      <label className={`${pfx}__label`}>
        <input type="checkbox" onChange={toggleCar} className={`${pfx}__cb`} />
        <div className={`${pfx}__name`}>{name}</div>
      </label>

      <Gauge value={price} min={1} max={6} step={1} disabled={!checked} callback={handlePriceChange} />
    </li>
  );
}