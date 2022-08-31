import { createSlice } from '@reduxjs/toolkit';
import { IAuctionItem, IAuctionObj } from './IAuction';

export const auctionSlice = createSlice({
    name: 'auction',
    initialState: {
      black: 0,
      blue: 0,
      green: 0,
      orange: 0,
      red: 0,
      yellow: 0
    } as IAuctionObj,
    reducers: {
      updateAuction: (state, action: { payload: IAuctionItem }) => {
        return { ...state, [action.payload.car]: action.payload.price };
      }
    },
  })
  
  export const { updateAuction } = auctionSlice.actions;
  export const auctionObj = (state: { auction: IAuctionObj }) => state.auction;
  export default auctionSlice.reducer;