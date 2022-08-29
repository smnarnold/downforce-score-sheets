import { useDispatch, useSelector } from 'react-redux';
import { ISlideBetProps } from './IBets';
import { nextSlide } from '../../UI/Wizard/wizardSlice';
import Slide from "../../UI/Slide";
import Instructions from "../../UI/Instructions";
import RadioCar from "../../UI/RadioCar";
import BettingPayouts from "../../UI/BettingPayouts";
import Btn from "../../UI/Btn";
import { betsArr } from './betsSlice';

function SlideBet({
  betIndex = 1,
  instructions = "",
  cars = [],
  bettingPrizes = [],
  btnText = "",
}: ISlideBetProps) {
  const dispatch = useDispatch();
  const bets = useSelector(betsArr);
  const prizesArr = bettingPrizes[betIndex];
  const actualBet = bets[betIndex];
  const btnIsDisabled = actualBet === null;

  const handleCompleted = () => dispatch(nextSlide());

  const carItems = cars.map((car) => {
    return (
      <RadioCar
        {...car}
        key={car.id}
        index={betIndex}
        currentBet={actualBet}
      />
    );
  });

  return (
    <Slide
      header={<Instructions text={instructions} />}
      body={
        <>
          {carItems}
          <BettingPayouts arr={prizesArr} title={'test'} />
        </>
      }
      footer={
        <Btn
          text={btnText}
          callback={handleCompleted}
          disabled={btnIsDisabled}
        />
      }
    />
  );
}

export default SlideBet;
