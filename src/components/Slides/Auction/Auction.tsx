import { useDispatch, useSelector } from 'react-redux';
import { auctionObj } from './auctionSlice';
import { ICar } from '../../../Interfaces';
import { nextSlide } from '../../UI/Wizard/wizardSlice';
import Slide from "../../UI/Slide";
import Instructions from "../../UI/Instructions";
import AuctionCar from "../../UI/RangeCarPrice";
import Btn from "../../UI/Btn";

interface SlideAuctionProps {
  instructions?: string;
  cars: any[];
  btnText?: string;
};

function SlideAuction({
  instructions = "",
  cars = [],
  btnText = "",
}: SlideAuctionProps) {
  // console.log('render auction')
  const dispatch = useDispatch();
  const auction = useSelector(auctionObj);
  const auctionArr = Object.values(auction)
  const auctionTotal = auctionArr.length ? auctionArr.reduce((a, b) => a + b) : 0;
  const btnIsDisabled = auctionTotal === 0;

  const handleCompleted = () => dispatch(nextSlide());
  
  const carItems = cars.map((car: ICar) => {
    return <AuctionCar {...car} key={car.id} />;
  });

  return (
    <Slide
      header={<Instructions text={instructions} />}
      body={carItems}
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

export default SlideAuction;
