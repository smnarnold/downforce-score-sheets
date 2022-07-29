import { useState, useCallback } from "react";
import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import BetCar from "../BetCar/BetCar";
import BettingPayouts from "../BettingPayouts/BettingPayouts";
import Btn from "../UI/Btn";

export default function SlideBet({
  slideIndex = 0,
  type: slideType = "bet",
  betIndex = 1,
  instructions = "",
  cars = [],
  bettingTitle = "",
  bettingPrizes = [],
  goToText = "",
  onSlideChange,
  onBetsChange,
}) {
  const [bet, setBet] = useState(null);
  const prizesArr = bettingPrizes[betIndex - 1];

  const handleBetChange = useCallback(
    (color) => {
      setBet(color);
      onBetsChange(betIndex - 1, color);
    },
    [betIndex, onBetsChange]
  );

  const carItems = cars.map((car) => {
    return (
      <BetCar
        {...car}
        key={car.id}
        index={betIndex}
        currentBet={bet}
        onBetChange={handleBetChange}
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
          callback={() => onSlideChange(slideIndex + 1)}
          disabled={bet === null}
        />
      }
    />
  );
}
