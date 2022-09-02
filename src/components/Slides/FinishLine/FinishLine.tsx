import { useDispatch, useSelector } from 'react-redux';
import { nextSlide } from '../../UI/Wizard/wizardSlice';
import Slide from "../../UI/Slide";
import SelectCarPosition from "../../UI/SelectCarPosition";
import Instructions from "../../UI/Instructions";
import Btn from "../../UI/Btn";
import { finishLineArr } from "./finishLineSlice";
import { useContext } from 'react';
import LangContext from '../../../store/i18n-context';

interface SlideFinishLineProps {
  cars: string[];
}

function SlideFinishLine({
  cars = [],
}: SlideFinishLineProps) {
  const dispatch = useDispatch();
  const langCtx = useContext(LangContext);
  const finishLine = useSelector(finishLineArr);
  const firstPos = finishLine[0];
  const btnIsDisabled = firstPos === null;

  const handleCompleted = () => dispatch(nextSlide());

  const carsSelectArr = cars.map((car, index) => {
    return (
      <SelectCarPosition
        key={car}
        cars={cars}
        index={index}
      />
    );
  });

  return (
    <Slide
      header={<Instructions text={langCtx.get("finishlineInstructions")} />}
      body={carsSelectArr}
      footer={
        <Btn
          text={langCtx.get("finishlineBtn")}
          disabled={btnIsDisabled}
          callback={handleCompleted}
        />
      }
    />
  );
}

export default SlideFinishLine;
