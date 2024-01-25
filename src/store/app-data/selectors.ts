import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Card } from '../../types/card';
import { PromoCard } from '../../types/promo-card';

export const getCards = (state: State): Card[] | null => state[NameSpace.AppData].cards;

export const getPromoCards = (state: State): PromoCard[] | null => state[NameSpace.AppData].promoCards;

export const getCardsDataLoadingStatus = (state: State): boolean => state[NameSpace.AppData].isCardsDataLoading;

export const getPromoCardsDataLoadingStatus = (state: State): boolean => state[NameSpace.AppData].isPromoCardsDataLoading;
