import { useState } from "react";
import { useDispatch } from 'react-redux';
import { nextSlide } from '../UI/Wizard/wizardSlice';
import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import RadioCar from "../UI/RadioCar";
import BettingPayouts from "../UI/BettingPayouts";
import Btn from "../UI/Btn";

interface SlideBetProps {
  betIndex: number;
  instructions: string;
  cars: any[];
  bettingPrizes: any[];
  btnText: string;
  onBetsChange: (index: number, bet: string) => void;
};

function SlideBet({
  betIndex = 1,
  instructions = "",
  cars = [],
  bettingPrizes = [],
  btnText = "",
  onBetsChange,
}: SlideBetProps) {
  const dispatch = useDispatch();
  const [bet, setBet] = useState<string>('');
  const prizesArr = bettingPrizes[betIndex - 1];

  function handleCompleted() {
    onBetsChange(betIndex - 1, bet);
    dispatch(nextSlide());
  };

  const carItems = cars.map((car) => {
    return (
      <RadioCar
        {...car}
        key={car.id}
        index={betIndex}
        currentBet={bet}
        onBetChange={id => setBet(id)}
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
          disabled={bet === null}
        />
      }
    />
  );
}

export default SlideBet;
