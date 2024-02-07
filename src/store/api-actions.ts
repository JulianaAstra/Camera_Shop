import { createAsyncThunk } from '@reduxjs/toolkit';
import { Card } from '../types/card.ts';
import { PromoCard } from '../types/promo-card.ts';
import { APIRoute } from '../const.ts';
import { ThunkObjType } from '../types/thunk-object.ts';
import { Review } from '../types/review.ts';
import { UserReview } from '../types/review.ts';

export const fetchCardsAction = createAsyncThunk<Card[], undefined, ThunkObjType>(
  'data/fetchCards', async (_arg, {extra: api}) => {
    const {data} = await
    api.get<Card[]>(APIRoute.Cards);
    return data;
  },
);

export const fetchPromoCardsAction = createAsyncThunk<PromoCard[], undefined, ThunkObjType>(
  'data/fetchPromoCards', async (_arg, {extra: api}) => {
    const {data} = await
    api.get<PromoCard[]>(APIRoute.Promo);
    return data;
  },
);

export const fetchSimilarCardsAction = createAsyncThunk<Card[], {id: number}, ThunkObjType>(
  'data/fetchSimilarCards', async ({id}, {extra: api}) => {
    const url = id !== undefined ? `${APIRoute.Cards}/${id}${APIRoute.Similar}` : '';
    const {data} = await
    api.get<Card[]>(url);
    return data;
  },
);

export const fetchCardReviewsAction = createAsyncThunk<Review[], {id: number}, ThunkObjType>(
  'data/fetchCardReviewAction', async ({id}, {extra: api}) => {
    const url = id !== undefined ? `${APIRoute.Cards}/${id}${APIRoute.Reviews}` : '';
    const {data} = await
    api.get<Review[]>(url);
    return data;
  },
);

export const fetchCardAction = createAsyncThunk<Card, {id: number}, ThunkObjType>(
  'data/fetchCard', async ({id}, {dispatch, extra: api}) => {
    const url = id !== undefined ? `${APIRoute.Cards}/${id}` : '';
    const {data} = await
    api.get<Card>(url);
    dispatch(fetchCardReviewsAction({id}));
    return data;
  },
);

export const fetchAddReviewAction = createAsyncThunk<void, UserReview, ThunkObjType>('user/addReview', async ({
  cameraId,
  userName,
  advantage,
  disadvantage,
  review,
  rating}, {extra: api}) => {
  const url = APIRoute.Reviews;
  await api.post<UserReview>(url, {
    cameraId,
    userName,
    advantage,
    disadvantage,
    review,
    rating});
  return undefined;
},);

