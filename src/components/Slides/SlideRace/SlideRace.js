import Slide from '../Slide/Slide';
import './SlideRace.scss';
import Instructions from '../../Instructions/Instructions';
import Btn from '../../UI/Btn/Btn';

export default function SlideRace({
  slideIndex = 0,
  type: slideType = "race",
  instructions = "",
  goToText = "",
  onSlideChange
}) {
  return (
    <Slide type={slideType}>
      <div className="slide__body">
        <Instructions text={instructions} />
        <Btn color="yellow" callback={() => onSlideChange(slideIndex + 1)}>
          {goToText}
        </Btn>
      </div>
    </Slide>
  );
}