import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { AppData } from '../../types/state.ts';
import { fetchCardsAction, fetchPromoCardsAction, fetchCardAction } from '../api-actions.ts';
import { TabName } from '../../const.ts';

const initialState: AppData = {
  cards: [],
  card: null,
  promoCards: [],
  isPromoCardsDataLoading: false,
  isCardsDataLoading: false,
  isCardDataLoading: false,
  activeTab: TabName.Description
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
    setCardDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isCardDataLoading = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
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
      })
      .addCase(fetchCardAction.pending, (state) => {
        state.isCardDataLoading = true;
      })
      .addCase(fetchCardAction.fulfilled, (state, action) => {
        state.card = action.payload;
        state.isCardsDataLoading = false;
      });
  }
});

export const {setActiveTab} = appData.actions;
