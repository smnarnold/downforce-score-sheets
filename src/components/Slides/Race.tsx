import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import Btn from "../UI/Btn";

interface SlideRaceProps {
  instructions: string;
  goToText: string;
  onSlideChange: () => void;
}

export default function SlideRace({
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
            callback={() => onSlideChange()}
          />
        </>
      }
    />
  );
}
