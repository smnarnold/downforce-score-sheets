import { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import { getCarTheme } from "../helpers";
import styled from "styled-components";
import { updateBets } from "../Slides/Bets/betsSlice";
import AppContext from "../../store/app-context";

const StyledRadioCar = styled.label`
  flex: 1 1 auto;
  position: relative;
  display: flex;
  width: 100%;

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: var(--stripe-height);
    padding:  0 var(--spacer);
  }

  input {
    position: absolute;
    top: 50%;
    left: var(--spacer);
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
  index: number;
  currentBet: null|string;
}

function RadioCar({
  id = "", // ex: "red"
  index = 0, // ex: 0 for the 1st bet
  currentBet,
}: RadioCarProps) {
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const name = appCtx.getTranslation(`car${appCtx.theme}[${id}]`);
  const [checked, setChecked] = useState(currentBet === id);
  const theme = getCarTheme(id);

  useEffect(() => {
    setChecked(currentBet === id);
  }, [currentBet, id]);

  function handleToggleRadio() {
    setChecked((c) => !c);
    dispatch( updateBets({index: index, car: id}) );
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
