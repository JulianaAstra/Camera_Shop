import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchCardsAction, fetchPromoCardsAction } from '../api-actions';

const initialState: AppData = {
  cards: [],
  promoCards: [],
  isPromoCardsDataLoading: false,
  isCardsDataLoading: false,
};

export const appData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers: {
    setCardsDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isCardsDataLoading = action.payload;
    },
    setPromoCardsDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isPromoCardsDataLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCardsAction.pending, (state) => {
        state.isCardsDataLoading = true;
      })
      .addCase(fetchCardsAction.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.isCardsDataLoading = false;
      })
      .addCase(fetchPromoCardsAction.pending, (state) => {
        state.isPromoCardsDataLoading = true;
      })
      .addCase(fetchPromoCardsAction.fulfilled, (state, action) => {
        state.promoCards = action.payload;
        state.isPromoCardsDataLoading = false;
      });
  }
});
