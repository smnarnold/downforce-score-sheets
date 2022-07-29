import Slide from "../../UI/Slide";
import CarOrder from "../../CarOrder/CarOrder";
import Instructions from "../../UI/Instructions";
import Btn from "../../UI/Btn";
import "./SlideFinishLine.scss";

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
  onSlideChange,
}) {
  const ordersLi = cars.map((car, index) => {
    return (
      <CarOrder
        id={car.id}
        key={car.id}
        cars={cars}
        posIndex={index}
        racingPrizes={racingPrizes}
        defaultOption={noCarSelected}
        finishPosArr={finishPosArr}
        onFinishPosChange={onFinishPosChange}
      />
    );
  });

  return (
    <Slide
      header={<Instructions text={instructions} />}
      body={<ol className={`${slideType}__order`}>{ordersLi}</ol>}
      footer={
        <Btn
          text={goToText}
          disabled={finishPosArr[0] === ""}
          callback={() => onSlideChange(slideIndex + 1)}
        />
      }
    />
  );
}
