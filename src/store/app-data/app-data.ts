import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchCardsAction } from '../api-actions';

const initialState: AppData = {
  cards: [],
  isCardsDataLoading: false,
};

export const appData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers: {
    setCardsDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isCardsDataLoading = action.payload;
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
      });
  }
});
