import { createSlice } from '@reduxjs/toolkit';
import { IAuctionItem, IAuctionObj } from './IAuction';

const initialAuction = {
  black: 0,
  blue: 0,
  green: 0,
  orange: 0,
  red: 0,
  yellow: 0
}

export const auctionSlice = createSlice({
    name: 'auction',
    initialState: initialAuction as IAuctionObj,
    reducers: {
      updateAuction: (state, action: { payload: IAuctionItem }) => {
        return { ...state, [action.payload.car]: action.payload.price };
      },
      resetAuction: () => {
        return initialAuction
      }
    },
  })
  
  export const { updateAuction, resetAuction } = auctionSlice.actions;
  export const auctionObj = (state: { auction: IAuctionObj }) => state.auction;
  export default auctionSlice.reducer;