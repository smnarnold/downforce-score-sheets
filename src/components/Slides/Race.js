import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import Btn from "../UI/Btn";

interface SlideRaceProps {
  slideIndex: number;
  instructions: string;
  goToText: string;
  onSlideChange: (index: number) => void;
}

export default function SlideRace({
  slideIndex = 0,
  instructions = "",
  goToText = "",
  onSlideChange,
}: SlideRaceProps) {
  
  return (
    <Slide
      body={
        <>
          <Instructions text={instructions} />
          <Btn
            text={goToText}
            theme="yellow"
            callback={() => onSlideChange(slideIndex + 1)}
          />
        </>
      }
    />
  );
}
