import { ReactElement, useState } from "react";
import { getCarTheme } from "../helpers";
import styled from "styled-components";

const StyledSelectCar = styled.label`
  flex: 1 1 auto;
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
    aign-items: center;
    width: 100%;
    height: 100%;
    min-height: var(--stripe-height);
    padding: 0.5em var(--spacer);
  }

  &:not([class*="car-theme"]):nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .position {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  select {
    flex: 1 1 auto;
    display: block;
    height: 100%;
    outline: none;
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
        {position && <span className="position">{position}</span>}
        <select onChange={(event) => handleChangeCar(event.target.value)}>
          {optionsArr}
        </select>
      </div>
    </StyledSelectCar>
  );
}

export default SelectCarPosition;
