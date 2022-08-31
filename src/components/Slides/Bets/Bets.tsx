import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { ISlideBetProps } from './IBets';
import { nextSlide } from '../../UI/Wizard/wizardSlice';
import Slide from "../../UI/Slide";
import Instructions from "../../UI/Instructions";
import RadioCar from "../../UI/RadioCar";
import BettingPayouts from "../../UI/BettingPayouts";
import Btn from "../../UI/Btn";
import { betsArr } from './betsSlice';
import { useContext } from 'react';
import LangContext from '../../../store/i18n-context';

const StyledBets = styled.figure`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .betting-options {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
`;

function SlideBet({
  betIndex = 1,
  cars = [],
  bettingPrizes = [],
}: ISlideBetProps) {
  const dispatch = useDispatch();
  const langCtx = useContext(LangContext);
  const bets = useSelector(betsArr);
  const prizesArr = bettingPrizes[betIndex];
  const actualBet = bets[betIndex];
  const btnIsDisabled = actualBet === null;

  const handleCompleted = () => dispatch(nextSlide());

  const carItems = cars.map((car) => {
    return (
      <RadioCar
        key={car.id}
        id={car.id}
        index={betIndex}
        currentBet={actualBet}
      />
    );
  });

  return (
    <Slide
      header={<Instructions text={langCtx.get("betInstructions")} />}
      body={
        <StyledBets>
          <div className="betting-options">
            {carItems}
          </div>
          <BettingPayouts arr={prizesArr} title={'test'} />
        </StyledBets>
      }
      footer={
        <Btn
          text={langCtx.get("letsRace")}
          callback={handleCompleted}
          disabled={btnIsDisabled}
        />
      }
    />
  );
}

export default SlideBet;
