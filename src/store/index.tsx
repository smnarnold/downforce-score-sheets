import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from '../components/Slides/Auction/auctionSlice';
import betsReducer from '../components/Slides/Bets/betsSlice';
import finishLineReducer from '../components/Slides/FinishLine/finishLineSlice';
import wizardReducer from '../components/UI/Wizard/wizardSlice';

export default configureStore({
    reducer: {
        auction: auctionReducer,
        bets: betsReducer,
        finishLine: finishLineReducer,
        wizard: wizardReducer,
    },
});
