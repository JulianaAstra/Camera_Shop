import { store } from '../store/index.ts';
import { Card } from './card.ts';
import { PromoCard } from './promo-card.ts';

export type AppData = {
  cards: Card[] | null;
  promoCards: PromoCard[] | null;
  isPromoCardsDataLoading: boolean;
  card: Card | null;
  activeTab: string | null;
  similarCards: Card[] | null;
  isCardsDataLoading: boolean;
  isCardDataLoading: boolean;
  isSimilarCardsDataLoading: boolean;
  // isBookingInformationDataLoading: boolean;
  // activeFilterTheme: string;
  // activeFilterDifficulty: string;
  // isBookQuestLoading: boolean;
  // isDeleteQuestLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
