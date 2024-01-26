import { store } from '../store/index.ts';
import { Card } from './card.ts';
import { PromoCard } from './promo-card.ts';

export type AppData = {
  cards: Card[] | null;
  promoCards: PromoCard[] | null;
  isPromoCardsDataLoading: boolean;
  // detailedQuest: DetailedQuest | null;
  // filteredQuests: Quest[] | null;
  // bookingInfo: Point[] | null;
  isCardsDataLoading: boolean;
  // isDetailedQuestDataLoading: boolean;
  // isBookingInformationDataLoading: boolean;
  // activeFilterTheme: string;
  // activeFilterDifficulty: string;
  // isBookQuestLoading: boolean;
  // isDeleteQuestLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
