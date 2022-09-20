import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCarTheme } from "../helpers";
import styled from "styled-components";
import AppContext from '../../store/app-context';
import { finishLineArr, updateFinishLine } from "../Slides/FinishLine/finishLineSlice";

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
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: var(--stripe-height);
    padding: 0.5em var(--spacer);
  }

  &:not([class*="car-theme"]):nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .position {
    flex: 0 0 45px;
    width: 45px;
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
    padding-right: 40px;
  }
`;

interface SelectCarPositionProps {
  index: number;
  cars: string[];
}

function SelectCarPosition({
  index = 0,
  cars = [],
}: SelectCarPositionProps) {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const finishLine = useSelector(finishLineArr);
  const value = finishLine[index] ?? ""; // if null or undefined, use empty string
  const [carTheme, setCarTheme] = useState(value);

  const carsNotRanked = useMemo(() => {
    return cars.filter(car => !finishLine.includes(car) || car === carTheme);
  }, [carTheme, cars, finishLine]);

  useEffect(() => {
    const value = finishLine[index] ?? "";
    setCarTheme(value);
  }, [index, finishLine]);

  const theme = getCarTheme(carTheme);
  const optionsArr = carsNotRanked.map((car) => <option key={car} value={car}>{appCtx.getTranslation(`car${appCtx.theme}[${car}]`)}</option>);

  function handleChangeCar(id: string) {
    setCarTheme(id);
    dispatch( updateFinishLine({index: index, car: id}) );
  }

  return (
    <StyledSelectCar className={`${theme} is-active`}>
      <div className="wrapper">
        <span className="position">{appCtx.getTranslation(`position${index + 1}`)}</span>
        <select value={carTheme} onChange={(event) => handleChangeCar(event.target.value)}>
          <option key="default" value="">
            {appCtx.getTranslation('noCar')}
          </option>
          {optionsArr}
        </select>
      </div>
    </StyledSelectCar>
  );
}

export default SelectCarPosition;
