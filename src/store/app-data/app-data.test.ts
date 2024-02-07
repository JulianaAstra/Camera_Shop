import { expect } from 'vitest';
import { makeFakeCard, makeFakePromoCard, makeFakeReviews, makeFakeSortedReviews } from '../../utils/test-mocks';
import { appData, setCardsDataLoadingStatus, setCardDataLoadingStatus, setCardReviewsDataLoadingStatus, setPromoCardsDataLoadingStatus, sortReviews } from './app-data';
import { testInitialAppDataState } from './app-data';
import { fetchCardAction, fetchCardReviewsAction, fetchCardsAction, fetchPromoCardsAction, fetchSimilarCardsAction } from '../api-actions';

describe('AppData Slice', () => {
  const state = {
    ...testInitialAppDataState,
    cards: [makeFakeCard()],
    card: makeFakeCard(),
    promoCards: [makeFakePromoCard()],
    similarCards: [makeFakeCard()],
    reviews: makeFakeReviews(),
    sortedReviews: makeFakeSortedReviews(),
  };

  const initialState = {
    ...testInitialAppDataState,
  };

  it('should return initial state when action is empty', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialAppDataState,
    };
    const result = appData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state when state is undefined', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialAppDataState,
    };
    const result = appData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should sort reviews from state', () => {
    const expectedSortedReviews = makeFakeSortedReviews();
    const result = appData.reducer(state, sortReviews());
    expect(result.sortedReviews).toEqual(expectedSortedReviews);
  });

  it('should return cards data loading status true when data is loading', () => {
    const expectedState = {
      ...testInitialAppDataState,
      isCardsDataLoading: true,
    };

    const result = appData.reducer(initialState, fetchCardsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should return cards data loading status false when data has loaded', () => {
    const cards = [makeFakeCard()];
    const expectedState = {
      ...testInitialAppDataState,
      cards,
      isCardsDataLoading: false,
    };

    const result = appData.reducer(initialState, fetchCardsAction.fulfilled(cards, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should return promo cards data loading status true when data is loading', () => {
    const expectedState = {
      ...testInitialAppDataState,
      isPromoCardsDataLoading: true,
    };

    const result = appData.reducer(initialState, fetchPromoCardsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should return promo cards data loading status false when data has loaded', () => {
    const promoCards = [makeFakePromoCard()];
    const expectedState = {
      ...testInitialAppDataState,
      promoCards,
      isPromoCardsDataLoading: false,
    };

    const result = appData.reducer(initialState, fetchPromoCardsAction.fulfilled(promoCards, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should return single card data loading status true when data is loading', () => {
    const expectedState = {
      ...testInitialAppDataState,
      isCardDataLoading: true,
    };

    const result = appData.reducer(initialState, fetchCardAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should return single card data loading status false when data has loaded', () => {
    const card = makeFakeCard();
    const expectedState = {
      ...testInitialAppDataState,
      card,
      isCardDataLoading: false,
    };

    const result = appData.reducer(initialState, fetchCardAction.fulfilled(card, '' , {id: 34}));
    expect(result).toEqual(expectedState);
  });

  it('should return similar cards data loading status true when data is loading', () => {
    const expectedState = {
      ...testInitialAppDataState,
      isSimilarCardsDataLoading: true,
    };

    const result = appData.reducer(initialState, fetchSimilarCardsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should return similar cards data loading status false when data has loaded', () => {
    const similarCards = [makeFakeCard()];
    const expectedState = {
      ...testInitialAppDataState,
      similarCards,
      isSimilarCardsDataLoading: false,
    };

    const result = appData.reducer(initialState, fetchSimilarCardsAction.fulfilled(similarCards, '', {id: 34}));
    expect(result).toEqual(expectedState);
  });

  it('should return reviews data loading status true when data is loading', () => {
    const expectedState = {
      ...testInitialAppDataState,
      isCardReviewsDataLoading: true,
    };

    const result = appData.reducer(initialState, fetchCardReviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should return reviews data loading status false when data has loaded', () => {
    const reviews = makeFakeReviews();
    const expectedState = {
      ...testInitialAppDataState,
      reviews,
      isCardReviewsDataLoading: false,
    };

    const result = appData.reducer(initialState, fetchCardReviewsAction.fulfilled(reviews, '' , {id: 34}));
    expect(result).toEqual(expectedState);
  });

  it('should set cards data loading status to state', () => {
    const expectedStateTrue = {
      ...testInitialAppDataState,
      isCardsDataLoading: true,
    };

    const expectedStateFalse = {
      ...testInitialAppDataState,
      isCardsDataLoading: false,
    };

    const resultTrue = appData.reducer(initialState, setCardsDataLoadingStatus(true));
    const resultFalse = appData.reducer(initialState, setCardsDataLoadingStatus(false));

    expect(resultTrue).toEqual(expectedStateTrue);
    expect(resultFalse).toEqual(expectedStateFalse);
  });

  it('should set promo cards data loading status to state', () => {
    const expectedStateTrue = {
      ...testInitialAppDataState,
      isPromoCardsDataLoading: true,
    };

    const expectedStateFalse = {
      ...testInitialAppDataState,
      isPromoCardsDataLoading: false,
    };

    const resultTrue = appData.reducer(initialState, setPromoCardsDataLoadingStatus(true));
    const resultFalse = appData.reducer(initialState, setPromoCardsDataLoadingStatus(false));

    expect(resultTrue).toEqual(expectedStateTrue);
    expect(resultFalse).toEqual(expectedStateFalse);
  });

  it('should set card data loading status to state', () => {
    const expectedStateTrue = {
      ...testInitialAppDataState,
      isCardDataLoading: true,
    };

    const expectedStateFalse = {
      ...testInitialAppDataState,
      isCardDataLoading: false,
    };

    const resultTrue = appData.reducer(initialState, setCardDataLoadingStatus(true));
    const resultFalse = appData.reducer(initialState, setCardDataLoadingStatus(false));

    expect(resultTrue).toEqual(expectedStateTrue);
    expect(resultFalse).toEqual(expectedStateFalse);
  });

  it('should set reviews data loading status to state', () => {
    const expectedStateTrue = {
      ...testInitialAppDataState,
      isCardReviewsDataLoading: true,
    };

    const expectedStateFalse = {
      ...testInitialAppDataState,
      isCardReviewsDataLoading: false,
    };

    const resultTrue = appData.reducer(initialState, setCardReviewsDataLoadingStatus(true));
    const resultFalse = appData.reducer(initialState, setCardReviewsDataLoadingStatus(false));

    expect(resultTrue).toEqual(expectedStateTrue);
    expect(resultFalse).toEqual(expectedStateFalse);
  });
});
