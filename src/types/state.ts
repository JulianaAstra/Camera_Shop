import { store } from '../store/index.ts';
import { Card } from './card.ts';
import { PromoCard } from './promo-card.ts';
import { Review } from './review.ts';

export type AppData = {
  cards: Card[] | null;
  promoCards: PromoCard[] | null;
  isPromoCardsDataLoading: boolean;
  card: Card | null;
  similarCards: Card[] | null;
  reviews: Review[] | null;
  sortedReviews: Review[] | null;
  isCardsDataLoading: boolean;
  isCardDataLoading: boolean;
  isSimilarCardsDataLoading: boolean;
  isCardReviewsDataLoading: boolean;
}

export type UserData = {
  isUserReviewLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
