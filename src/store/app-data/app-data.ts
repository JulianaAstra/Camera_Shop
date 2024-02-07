import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { AppData } from '../../types/state.ts';
import { fetchCardsAction, fetchPromoCardsAction, fetchCardAction, fetchSimilarCardsAction, fetchCardReviewsAction } from '../api-actions.ts';

const initialState: AppData = {
  cards: [],
  card: null,
  promoCards: [],
  similarCards: [],
  reviews: [],
  sortedReviews: [],
  isPromoCardsDataLoading: false,
  isCardsDataLoading: false,
  isCardDataLoading: false,
  isSimilarCardsDataLoading: false,
  isCardReviewsDataLoading: false,
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
    setCardReviewsDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isCardReviewsDataLoading = action.payload;
    },
    sortReviews: (state) => {
      if (state.reviews !== null) {
        state.sortedReviews = state.reviews;
        state.sortedReviews.sort((a, b) => {
          const dateA = new Date(a.createAt).getTime();
          const dateB = new Date(b.createAt).getTime();
          return dateB - dateA;
        });
      }
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
      })
      .addCase(fetchSimilarCardsAction.pending, (state) => {
        state.isSimilarCardsDataLoading = true;
      })
      .addCase(fetchSimilarCardsAction.fulfilled, (state, action) => {
        state.similarCards = action.payload;
        state.isSimilarCardsDataLoading = false;
      })
      .addCase(fetchCardReviewsAction.pending, (state) => {
        state.isCardReviewsDataLoading = true;
      })
      .addCase(fetchCardReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isCardReviewsDataLoading = false;
      });
  }
});

export const {sortReviews, setCardDataLoadingStatus, setCardReviewsDataLoadingStatus, setCardsDataLoadingStatus, setPromoCardsDataLoadingStatus} = appData.actions;
export {initialState as testInitialAppDataState};
