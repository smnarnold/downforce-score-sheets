import { ReactElement, useState } from "react";
import { getCarTheme } from "../helpers";
import styled from "styled-components";

const StyledSelectCar = styled.label`
  position: relative;
  width: 100%;
  margin: 0;
  font-style: italic;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;

  .wrapper {
    position: relative;
    display: flex;
    width: 100%;
    min-height: var(--stripe-height);
    padding: 0.5em calc(var(--fz) * 2);
  }

  &:not([class*="car-theme"]):nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  > span {
    flex: 0 0 auto;
  }

  select {
    flex: 1 1 auto;
    background-color: transparent;
    color: currentColor;
    font-size: 1em;
    font-style: italic;
    font-weight: bold;
    text-align: center;
    border: 0;
    padding-right: 10%;
  }
`;

interface SelectCarPositionProps {
  index: number;
  cars: any[];
  position: string;
  defaultOptionText: string;
  carsAvailable: string[];
  onCarsOrderChange: (index: number, color: string) => void;
}

function SelectCarPosition({
  index = 0,
  cars = [],
  position = "",
  defaultOptionText = "",
  carsAvailable = [],
  onCarsOrderChange,
}: SelectCarPositionProps) {
  const [carTheme, setCarTheme] = useState("");
  const theme = getCarTheme(carTheme);
  const optionsArr: ReactElement[] = [
    <option key="default" value="">{defaultOptionText}</option>,
  ];

  cars.forEach((car) => {
    if (carsAvailable.includes(car.id) || carTheme === car.id) {
      optionsArr?.push(
        <option key={car.id} value={car.id}>
          {car?.name}
        </option>
      );
    }
  });

  function handleChangeCar(id: string) {
    setCarTheme(id);
    onCarsOrderChange(index, id);
  }

  return (
    <StyledSelectCar className={`${theme} is-active`}>
      <div className="wrapper">
        {position && <span>{position}</span>}
        <select onChange={(event) => handleChangeCar(event.target.value)}>
          {optionsArr}
        </select>
      </div>
    </StyledSelectCar>
  );
}

export default SelectCarPosition;
