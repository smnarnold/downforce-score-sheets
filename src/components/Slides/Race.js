import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import Btn from "../UI/Btn";

export default function SlideRace({
  slideIndex = 0,
  type: slideType = "race",
  instructions = "",
  goToText = "",
  onSlideChange,
}) {
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
