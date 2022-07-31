import { ReactElement, useState } from "react";

import styled from "styled-components";

const StyledSelectCar = styled.label`
  position: relative;
  display: flex;
  width: 100%;
  font-style: italic;
  font-weight: bold;
  text-align: center;
  min-height: var(--stripe-height);
  margin: 0;
  padding: 0.5em calc(var(--fz) * 2);

  &:not([class*="theme"]):nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  > span {
    flex: 0 0 15%;
  }

  select {
    flex: 0 0 85%;
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
  id: string;
  index: number;
  cars: any[];
  position: string;
  defaultOptionText: string;
  carsAvailable: string[];
  onCarsOrderChange: (index: number, color: string) => void;
}

function SelectCarPosition({
  id = "",
  index = 0,
  cars = [],
  position = "",
  defaultOptionText = "",
  carsAvailable = [],
  onCarsOrderChange,
}: SelectCarPositionProps) {
  const [carTheme, setCarTheme] = useState("");
  const theme = carTheme.trim().length ? `car-theme-${carTheme}` : "";
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
    <StyledSelectCar className={theme}>
      {position && <span>{position}</span>}
      <select onChange={(event) => handleChangeCar(event.target.value)}>
        {optionsArr}
      </select>
    </StyledSelectCar>
  );
}

export default SelectCarPosition;
