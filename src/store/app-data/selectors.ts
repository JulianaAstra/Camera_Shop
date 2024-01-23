import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Card } from '../../types/card';

export const getCards = (state: State): Card[] | null => state[NameSpace.AppData].cards;

export const getCardsDataLoadingStatus = (state: State): boolean => state[NameSpace.AppData].isCardsDataLoading;
