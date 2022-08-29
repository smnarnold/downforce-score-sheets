import { useDispatch, useSelector } from 'react-redux';
import { nextSlide } from '../../UI/Wizard/wizardSlice';
import Slide from "../../UI/Slide";
import SelectCarPosition from "../../UI/SelectCarPosition";
import Instructions from "../../UI/Instructions";
import Btn from "../../UI/Btn";
import { finishLineArr } from "./finishLineSlice";

interface SlideFinishLineProps {
  instructions: string;
  cars: any[];
  btnText: string;
}

function SlideFinishLine({
  instructions = "",
  cars = [],
  btnText = "",
}: SlideFinishLineProps) {
  const dispatch = useDispatch();
  const finishLine = useSelector(finishLineArr);
  const firstPos = finishLine[0];
  const btnIsDisabled = firstPos === null;

  const handleCompleted = () => dispatch(nextSlide());

  const carsSelectArr = cars.map((car, index) => {
    return (
      <SelectCarPosition
        key={car.id}
        cars={cars}
        index={index}
      />
    );
  });

  return (
    <Slide
      header={<Instructions text={instructions} />}
      body={carsSelectArr}
      footer={
        <Btn
          text={btnText}
          disabled={btnIsDisabled}
          callback={handleCompleted}
        />
      }
    />
  );
}

export default SlideFinishLine;
