import { useDispatch, useSelector } from 'react-redux';
import { auctionObj } from './auctionSlice';
import { nextSlide } from '../../UI/Wizard/wizardSlice';
import Slide from "../../UI/Slide";
import Instructions from "../../UI/Instructions";
import RangeCarPrice from "../../UI/RangeCarPrice";
import Btn from "../../UI/Btn";
import { useContext } from 'react';
import LangContext from '../../../store/i18n-context';

interface SlideAuctionProps {
  instructions?: string;
  cars: any[];
};

function SlideAuction({
  instructions = "",
  cars = [],
}: SlideAuctionProps) {
  const dispatch = useDispatch();
  const langCtx = useContext(LangContext);
  const auction = useSelector(auctionObj);
  const auctionArr = Object.values(auction)
  const auctionTotal = auctionArr.length ? auctionArr.reduce((a, b) => a + b) : 0;
  const btnIsDisabled = auctionTotal === 0;

  const handleCompleted = () => dispatch(nextSlide());
  
  const carItems = cars.map((car: string) => <RangeCarPrice key={car} id={car} />);

  return (
    <Slide
      header={<Instructions text={instructions} />}
      body={carItems}
      footer={
        <Btn
          text={langCtx.get("letsRace")}
          disabled={btnIsDisabled}
          callback={handleCompleted}
        />
      }
    />
  );
}

export default SlideAuction;
