import { createAsyncThunk } from '@reduxjs/toolkit';
import { Card } from '../types/card.ts';
import { PromoCard } from '../types/promo-card.ts';
// import { redirectToRoute } from './action';
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

// export const fetchBookedQuestsAction = createAsyncThunk<BookedQuest[], undefined, ThunkObjType>(
//   'data/fetchBookedQuests', async (_arg, { extra: api}) => {
//     const {data} = await
//     api.get<BookedQuest[]>(APIRoute.Reservation);
//     return data;
//   },
// );

// export const checkAuthAction = createAsyncThunk<void, undefined, ThunkObjType>(
//   'user/checkAuth',
//   async (_arg, {extra: api}) => {
//     await api.get(APIRoute.Login);
//   }
// );

// export const loginAction = createAsyncThunk<void, AuthData, ThunkObjType>('user/login', async ({email, password}, {dispatch, extra: api}) => {
//   const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
//   saveToken(token);
//   dispatch(redirectToRoute(AppRoute.Root));
// },);

// export const logoutAction = createAsyncThunk<void, undefined, ThunkObjType>('user/logout', async (_arg, {dispatch, extra: api}) => {
//   await api.delete(APIRoute.Logout);
//   dropToken();
//   dispatch(redirectToRoute(AppRoute.Root));
// },);

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
},);

// export const deleteQuestAction = createAsyncThunk<void, reservationId, ThunkObjType>(
//   'data/deleteQuest', async ({reservId}, {dispatch, extra: api}) => {
//     const url = reservId !== undefined ? `${APIRoute.Reservation}/${reservId}` : '';
//     await api.delete(url);
//     dispatch(fetchBookedQuestsAction());
//   },);
