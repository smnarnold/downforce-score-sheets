import { useState } from "react";
import { useDispatch } from 'react-redux';
import { nextSlide } from '../UI/Wizard/wizardSlice';
import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import AuctionCar from "../UI/RangeCarPrice";
import Btn from "../UI/Btn";

interface SlideAuctionProps {
  instructions?: string;
  cars: any[];
  btnText?: string;
  onAuctionChange: (obj: any) => void;
};

function SlideAuction({
  instructions = "",
  cars = [],
  btnText = "",
  onAuctionChange,
}: SlideAuctionProps) {
  const dispatch = useDispatch();
  const [auctionObj, setAuctionObj] = useState({});
  const btnIsDisabled = Boolean(!Object.keys(auctionObj).length);

  function handleBidChange({ id, price }: { id: string, price: number }) {
    let obj = { ...auctionObj, [id]: price } as any;
    if (price === 0) delete obj[id];

    setAuctionObj(obj);
  };

  function handleCompleted() {
    onAuctionChange(auctionObj);
    dispatch(nextSlide());
  }
  
  const carItems = cars.map((car) => {
    return <AuctionCar {...car} key={car.id} onBidChange={handleBidChange} />;
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
