import { useState } from "react";
import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import RadioCar from "../UI/RadioCar";
import BettingPayouts from "../UI/BettingPayouts";
import Btn from "../UI/Btn";

interface SlideBetProps {
  slideIndex: number;
  betIndex: number;
  instructions: string;
  cars: any[];
  bettingTitle: string;
  bettingPrizes: any[];
  goToText: string;
  onSlideChange: (index: number) => void;
  onBetsChange: (index: number, bet: string) => void;
};

function SlideBet({
  slideIndex = 0,
  betIndex = 1,
  instructions = "",
  cars = [],
  bettingTitle = "",
  bettingPrizes = [],
  goToText = "",
  onSlideChange,
  onBetsChange,
}: SlideBetProps) {
  const [bet, setBet] = useState<string>('');
  const prizesArr = bettingPrizes[betIndex - 1];

  function handleCompleted() {
    onBetsChange(betIndex - 1, bet);
    onSlideChange(slideIndex + 1)
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
          <BettingPayouts arr={prizesArr} title={bettingTitle} />
        </>
      }
      footer={
        <Btn
          text={goToText}
          callback={handleCompleted}
          disabled={bet === null}
        />
      }
    />
  );
}

export default SlideBet;
