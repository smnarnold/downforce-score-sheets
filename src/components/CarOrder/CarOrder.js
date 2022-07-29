import { useState } from "react";
import "./CarOrder.scss";

export default function CarOrder({
  posIndex,
  cars = [],
  racingPrizes = [],
  defaultOption,
  finishPosArr,
  onFinishPosChange,
}) {
  const pfx = "car-order";
  const [carTheme, setCarTheme] = useState(null);
  const theme = carTheme != null ? `car-theme-${carTheme}` : "";
  const optionsArr = [];
  cars.forEach((car) => {
    if (!finishPosArr.includes(car.id) || carTheme === car.id) {
      optionsArr.push(
        <option key={car.id} value={car.id}>
          {car.name}
        </option>
      );
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
