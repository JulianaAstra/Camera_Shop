import { NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';
import { Card } from '../../types/card.ts';
import { PromoCard } from '../../types/promo-card.ts';

export const getCards = (state: State): Card[] | null => state[NameSpace.AppData].cards;

export const getPromoCards = (state: State): PromoCard[] | null => state[NameSpace.AppData].promoCards;

export const getCardsDataLoadingStatus = (state: State): boolean => state[NameSpace.AppData].isCardsDataLoading;

export const getPromoCardsDataLoadingStatus = (state: State): boolean => state[NameSpace.AppData].isPromoCardsDataLoading;
