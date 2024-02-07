import { NameSpace } from '../const';
import { getCard, getCardDataLoadingStatus, getCardReviewsDataLoadingStatus, getCards, getCardsDataLoadingStatus, getPromoCards, getPromoCardsDataLoadingStatus, getReviews, getSimilarCards, getSimilarCardsDataLoadingStatus, getSortedReviews } from './app-data/selectors';
import { makeFakeCard, makeFakePromoCard, makeFakeReviews, makeFakeSortedReviews} from '../utils/test-mocks';
import { getUserReviewLoadingStatus } from './user-data/selectors';

describe('AppData and UserData selectors', () => {
  const state = {
    [NameSpace.AppData]: {
      cards: [makeFakeCard()],
      card: makeFakeCard(),
      promoCards: [makeFakePromoCard()],
      similarCards: [makeFakeCard()],
      reviews: makeFakeReviews(),
      sortedReviews: makeFakeSortedReviews(),
      isPromoCardsDataLoading: false,
      isCardsDataLoading: false,
      isCardDataLoading: false,
      isSimilarCardsDataLoading: false,
      isCardReviewsDataLoading: false,
    },

    [NameSpace.UserData]: {
      isUserReviewLoading: false,
    },
  };

  it('should get cards list', () => {
    const { cards } = state[NameSpace.AppData];
    const result = getCards(state);
    expect(result).toEqual(cards);
  });

  it('should get single card', () => {
    const { card } = state[NameSpace.AppData];
    const result = getCard(state);
    expect(result).toEqual(card);
  });

  it('should get promoCards', () => {
    const { promoCards } = state[NameSpace.AppData];
    const result = getPromoCards(state);
    expect(result).toEqual(promoCards);
  });

  it('should get similarCards', () => {
    const { similarCards } = state[NameSpace.AppData];
    const result = getSimilarCards(state);
    expect(result).toEqual(similarCards);
  });

  it('should get reviews', () => {
    const { reviews } = state[NameSpace.AppData];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should get sorted reviews', () => {
    const { sortedReviews } = state[NameSpace.AppData];
    const result = getSortedReviews(state);
    expect(result).toEqual(sortedReviews);
  });

  it('should get promoCards loading status', () => {
    const { isPromoCardsDataLoading } = state[NameSpace.AppData];
    const result = getPromoCardsDataLoadingStatus(state);
    expect(result).toBe(isPromoCardsDataLoading);
  });

  it('should get cards data loading status', () => {
    const { isCardsDataLoading } = state[NameSpace.AppData];
    const result = getCardsDataLoadingStatus(state);
    expect(result).toBe(isCardsDataLoading);
  });

  it('should get single card data loading status', () => {
    const { isCardDataLoading } = state[NameSpace.AppData];
    const result = getCardDataLoadingStatus(state);
    expect(result).toBe(isCardDataLoading);
  });

  it('should get similar cards data loading status', () => {
    const { isSimilarCardsDataLoading } = state[NameSpace.AppData];
    const result = getSimilarCardsDataLoadingStatus(state);
    expect(result).toBe(isSimilarCardsDataLoading);
  });

  it('should get card reviews data loading status', () => {
    const { isCardReviewsDataLoading } = state[NameSpace.AppData];
    const result = getCardReviewsDataLoadingStatus(state);
    expect(result).toBe(isCardReviewsDataLoading);
  });

  it('should get user review data loading status', () => {
    const { isUserReviewLoading } = state[NameSpace.UserData];
    const result = getUserReviewLoadingStatus(state);
    expect(result).toBe(isUserReviewLoading);
  });
});

