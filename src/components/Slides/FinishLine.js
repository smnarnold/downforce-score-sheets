import { useEffect, useState } from "react";
import Slide from "../UI/Slide";
import SelectCarPosition from "../UI/SelectCarPosition";
import Instructions from "../UI/Instructions";
import Btn from "../UI/Btn";

export default function SlideFinishLine({
  slideIndex = 0,
  instructions = "",
  cars = [],
  racingPrizes = [],
  goToText = "",
  noCarSelected = "No car",
  onFinishPosChange,
  onSlideChange,
}) {
  const [carsPosArr, setCarsPosArr] = useState(new Array(6));
  const [carsNotRankedArr, setCarsNotRankedArr] = useState(cars);

  useEffect(() => {
    const carsNotRanked = cars.map(car => car.id).filter(id => !carsPosArr.includes(id))
    setCarsNotRankedArr(carsNotRanked);
  }, [cars, carsPosArr]);

  function handleCarsOrderChange(index, id) {
    let temp = [...carsPosArr];
    temp[index] = id;
    setCarsPosArr(temp);
  }

  function handleCompleted() {
    onFinishPosChange(carsPosArr);
    onSlideChange(slideIndex + 1)
  }

  const carsSelectArr = cars.map((car, index) => {
    return (
      <SelectCarPosition
        id={car.id}
        key={car.id}
        cars={cars}
        position={racingPrizes[index].label}
        index={index}
        defaultOptionText={noCarSelected}
        carsPosArr={carsPosArr}
        carsAvailable={carsNotRankedArr}
        onCarsOrderChange={handleCarsOrderChange}
      />
    );
  });

  return (
    <Slide
      header={<Instructions text={instructions} />}
      body={carsSelectArr}
      footer={
        <Btn
          text={goToText}
          disabled={!carsPosArr[0]}
          callback={handleCompleted}
        />
      }
    />
  );
}
