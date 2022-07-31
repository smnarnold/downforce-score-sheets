import { useState, useEffect } from "react";
import { getCarTheme } from "../helpers";
import styled from "styled-components";

const StyledRadioCar = styled.label`
  position: relative;
  display: block;
  width: 100%;

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: var(--stripe-height);
    padding: calc(var(--fz) * 0.5);
  }

  input {
    position: absolute;
    top: 50%;
    left: calc(var(--fz) * 2);
    transform: translateY(-50%);
    margin: 0;
  }

  &:hover,
  &.is-checkeded {
    opacity: 1;
  }
`;

interface RadioCarProps {
  id: string;
  name: string;
  index: number;
  currentBet: string;
  onBetChange: (id: string) => void;
}

function RadioCar({
  id = "", // ex: "red"
  name = "", // ex: "Red"
  index = 0, // ex: 0 for the 1st bet
  currentBet,
  onBetChange,
}: RadioCarProps) {
  const [checked, setChecked] = useState(currentBet === id);
  const theme = getCarTheme(id);

  useEffect(() => {
    setChecked(currentBet === id);
  }, [currentBet, id]);

  function handleToggleRadio() {
    setChecked((c) => !c);
    onBetChange(id);
  }

  return (
    <StyledRadioCar key={id} className={`${checked && "is-active"} ${theme}`}>
      <div className="wrapper">
        <input
          type="radio"
          name={`bet-${index}`}
          value={id}
          onChange={handleToggleRadio}
        />

        {name}
      </div>
    </StyledRadioCar>
  );
}

export default RadioCar;
