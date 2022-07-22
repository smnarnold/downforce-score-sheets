import React from 'react';
import './CarOrder.scss';

export default function CarOrder({
  posIndex,
  cars = [],
  racingPrizes = [],
  defaultOption,
  finishPosArr,
  onFinishPosChange
}) {
  const pfx = "car-order";
  const [carTheme, setCarTheme] = React.useState(null);
  const theme = carTheme != null ? `car-theme-${carTheme}` : "";

  const optionsArr = cars.map((car) => {
    if (!finishPosArr.includes(car.id) || carTheme == car.id) {
      return <option value={car.id}>{car.name}</option>;
    }
  });

  function handleChangeCar(color) {
    setCarTheme(color);
    onFinishPosChange(posIndex, color);
  }

  return (
    <li className={`${pfx} ${theme}`}>
      <label className={`${pfx}__label`}>
        <span className={`${pfx}__pos`}>{racingPrizes[posIndex].label}</span>
        <select
          name={`card-order-${posIndex + 1}`}
          onChange={(event) => handleChangeCar(event.target.value)}
          className={`${pfx}__select`}
        >
          <option value="">{defaultOption}</option>
          {optionsArr}
        </select>
      </label>
    </li>
  );
}