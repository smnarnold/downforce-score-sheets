import { createSlice } from '@reduxjs/toolkit';
import { IAuctionItem, IAuctionObj } from './IAuction';

export const auctionSlice = createSlice({
    name: 'auction',
    initialState: {
      obj: {},
    },
    reducers: {
      updateAuction: (state: { obj: IAuctionObj; }, action: { payload: IAuctionItem }) => {
        state.obj = { ...state.obj, [action.payload.car]: action.payload.price };
      }
    },
  })
  
  export const { updateAuction } = auctionSlice.actions;
  export const auctionObj = (state: { auction: { obj: IAuctionObj; }; }) => state.auction.obj;
  export default auctionSlice.reducer;