import React from 'react';
import Slide from '../Slide/Slide';
import CarOrder from '../CarOrder/CarOrder';
import Instructions from '../Instructions/Instructions';
import Btn from '../Btn/Btn';
import './SlideFinishLine.scss'

export default function SlideFinishLine({
  slideIndex = 0,
  type: slideType = "finishline",
  instructions = "",
  cars = [],
  racingPrizes = [],
  goToText = "",
  finishPosArr = [],
  noCarSelected = "No car",
  onFinishPosChange,
  onSlideChange
}) {
  const ordersLi = cars.map((car, index) => {
    return (
      <CarOrder
        cars={cars}
        posIndex={index}
        racingPrizes={racingPrizes}
        defaultOption={noCarSelected}
        finishPosArr={finishPosArr}
        onFinishPosChange={onFinishPosChange}
      />
    );
  });

  const handleFinishPosChange = React.useCallback((index, color) => {
    onFinishPosChange(index, color);
  });

  return (
    <Slide type={slideType}>
      <div className="slide__body">
        <Instructions text={instructions} />
        <ol className={`${slideType}__order`}>{ordersLi}</ol>
      </div>

      <footer className="slide__footer">
        <Btn
          disabled={finishPosArr[0] === ""}
          callback={() => onSlideChange(slideIndex + 1)}
        >
          {goToText}
        </Btn>
      </footer>
    </Slide>
  );
}