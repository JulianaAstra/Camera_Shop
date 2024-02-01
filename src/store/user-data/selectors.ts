import { NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';

export const getUserReviewLoadingStatus = (state: State): boolean => state[NameSpace.UserData].isUserReviewLoading;
