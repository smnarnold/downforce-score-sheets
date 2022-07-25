import {useState, useCallback} from 'react';
import Slide from '../Slide/Slide';
import './SlideBet.scss';
import Instructions from '../Instructions/Instructions';
import BetCar from '../BetCar/BetCar';
import BettingPayouts from '../BettingPayouts/BettingPayouts';
import Btn from '../Btn/Btn';

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
  onBetsChange
}) {
  const [bet, setBet] = useState(null);
  const prizesArr = bettingPrizes[betIndex - 1];

  const handleBetChange = useCallback((color) => {
    setBet(color);
    onBetsChange(betIndex - 1, color);
  }, [betIndex, onBetsChange]);

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
    <Slide type={slideType}>
      <div className="slide__body">
        <Instructions text={instructions} />
        <ul className="bets-list">{carItems}</ul>
        <BettingPayouts arr={prizesArr} title={bettingTitle} />
      </div>

      <footer className="slide__footer">
        <Btn
          callback={() => onSlideChange(slideIndex + 1)}
          disabled={bet === null}
        >
          {goToText}
        </Btn>
      </footer>
    </Slide>
  );
}