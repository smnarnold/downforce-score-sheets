import { useDispatch } from 'react-redux';
import { nextSlide } from '../UI/Wizard/wizardSlice';
import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import Btn from "../UI/Btn";

interface SlideRaceProps {
  instructions?: string;
  btnText?: string;
}

export default function SlideRace({
  instructions = "",
  btnText = "",
}: SlideRaceProps) {
  const dispatch = useDispatch();

  return (
    <Slide
      body={
        <>
          <Instructions text={instructions} />
          <Btn
            text={btnText}
            theme="yellow"
            callback={() => dispatch(nextSlide())}
          />
        </>
      }
    />
  );
}
