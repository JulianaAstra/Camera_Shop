import { extractActionTypes, makeFakeCard, makeFakePromoCard, AppThunkDispatch, makeFakeReviews, makeFakeUserReview } from '../utils/test-mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { fetchAddReviewAction, fetchCardAction, fetchCardReviewsAction, fetchCardsAction, fetchPromoCardsAction, fetchSimilarCardsAction } from './api-actions';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator =
    configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ APP_DATA: { cards: [] } });
  });

  describe('fetchCardsAction', () => {
    it('should return an array with cards when code is 200', async () => {
      const mockCards = [makeFakeCard()];
      mockAxiosAdapter.onGet(APIRoute.Cards).reply(200, mockCards);

      await store.dispatch(fetchCardsAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);

      expect(extractedActionTypes).toContain(fetchCardsAction.pending.type);
      expect(extractedActionTypes).toContain(fetchCardsAction.fulfilled.type);

      const fetchCardsActionFulfilled = emittedActions.find((action) =>
        action.type === fetchCardsAction.fulfilled.type
      ) as ReturnType<typeof fetchCardsAction.fulfilled>;
      expect(fetchCardsActionFulfilled.payload).toEqual(mockCards);
    });

    it('should return fetchCardsAction.pending and fetchCardsAction.rejected when code 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cards).reply(400, []);

      await store.dispatch(fetchCardsAction());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toContain(fetchCardsAction.pending.type);
      expect(actions).toContain(fetchCardsAction.rejected.type);
    });
  });

  describe('fetchPromoCardsAction', () => {
    it('should return an array with promo cards when code is 200', async () => {
      const mockPromoCards = [makeFakePromoCard()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoCards);

      await store.dispatch(fetchPromoCardsAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);

      expect(extractedActionTypes).toContain(fetchPromoCardsAction.pending.type);
      expect(extractedActionTypes).toContain(fetchPromoCardsAction.fulfilled.type);

      const fetchPromoCardsActionFulfilled = emittedActions.find((action) =>
        action.type === fetchPromoCardsAction.fulfilled.type
      ) as ReturnType<typeof fetchPromoCardsAction.fulfilled>;
      expect(fetchPromoCardsActionFulfilled.payload).toEqual(mockPromoCards);
    });

    it('should return fetchPromoCardsAction.pending and fetchPromoCardsAction.rejected when code 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoCardsAction());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toContain(fetchPromoCardsAction.pending.type);
      expect(actions).toContain(fetchPromoCardsAction.rejected.type);
    });
  });

  describe('fetchSimilarCardsAction', () => {
    const mockCard = makeFakeCard();
    const mockId = mockCard.id;
    const mockSimilarCards = [makeFakeCard()];

    it('should return an array with similar cards when code is 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${mockId}${APIRoute.Similar}`).reply(200, mockSimilarCards);

      await store.dispatch(fetchSimilarCardsAction({id: mockId}));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);

      expect(extractedActionTypes).toContain(fetchSimilarCardsAction.pending.type);
      expect(extractedActionTypes).toContain(fetchSimilarCardsAction.fulfilled.type);

      const fetchSimilarCardsActionFulfilled = emittedActions.find((action) =>
        action.type === fetchSimilarCardsAction.fulfilled.type
      ) as ReturnType<typeof fetchSimilarCardsAction.fulfilled>;
      expect(fetchSimilarCardsActionFulfilled.payload).toEqual(mockSimilarCards);
    });

    it('should return fetchSimilarCardsAction.pending and fetchSimilarCardsAction.rejected when code 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${mockId}${APIRoute.Similar}`).reply(404, []);

      await store.dispatch(fetchSimilarCardsAction({id: 1}));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toContain(fetchSimilarCardsAction.pending.type);
      expect(actions).toContain(fetchSimilarCardsAction.rejected.type);
    });
  });

  describe('fetchCardReviewsAction', () => {
    const mockCard = makeFakeCard();
    const mockId = mockCard.id;
    const mockReviews = makeFakeReviews();

    it('should return an array with reviews when code is 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${mockId}${APIRoute.Reviews}`).reply(200, mockReviews);

      await store.dispatch(fetchCardReviewsAction({id: mockId}));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);

      expect(extractedActionTypes).toContain(fetchCardReviewsAction.pending.type);
      expect(extractedActionTypes).toContain(fetchCardReviewsAction.fulfilled.type);

      const fetchCardReviewsActionFulfilled = emittedActions.find((action) =>
        action.type === fetchCardReviewsAction.fulfilled.type
      ) as ReturnType<typeof fetchCardReviewsAction.fulfilled>;
      expect(fetchCardReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should return fetchCardReviewsAction.pending and fetchCardReviewsAction.rejected when code 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${mockId}${APIRoute.Reviews}`).reply(404, []);

      await store.dispatch(fetchCardReviewsAction({id: 1}));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toContain(fetchCardReviewsAction.pending.type);
      expect(actions).toContain(fetchCardReviewsAction.rejected.type);
    });
  });

  describe('fetchCardAction', () => {
    const mockCard = makeFakeCard();
    const mockId = mockCard.id;

    it('should return an array with reviews when code is 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${mockId}`).reply(200, mockCard);

      await store.dispatch(fetchCardAction({id: mockId}));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);

      expect(extractedActionTypes).toContain(fetchCardAction.pending.type);
      expect(extractedActionTypes).toContain(fetchCardAction.fulfilled.type);

      const fetchCardActionFulfilled = emittedActions.find((action) =>
        action.type === fetchCardAction.fulfilled.type
      ) as ReturnType<typeof fetchCardAction.fulfilled>;
      expect(fetchCardActionFulfilled.payload).toEqual(mockCard);
    });

    it('should return fetchCardAction.pending and fetchCardAction.rejected when code 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${mockId}`).reply(404, []);

      await store.dispatch(fetchCardAction({id: 1}));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toContain(fetchCardAction.pending.type);
      expect(actions).toContain(fetchCardAction.rejected.type);
    });
  });

  describe('fetchAddReviewAction', () => {
    const mockUserReview = makeFakeUserReview();

    it('should send review to server when code is 201', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(201, mockUserReview);

      await store.dispatch(fetchAddReviewAction(mockUserReview));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);

      expect(extractedActionTypes).toContain(fetchAddReviewAction.pending.type);
      expect(extractedActionTypes).toContain(fetchAddReviewAction.fulfilled.type);

      const fetchAddReviewActionFulfilled = emittedActions.find((action) =>
        action.type === fetchAddReviewAction.fulfilled.type
      ) as ReturnType<typeof fetchAddReviewAction.fulfilled>;
      expect(fetchAddReviewActionFulfilled.payload).toBeUndefined();
    });

    it('should return fetchCardAction.pending and fetchCardAction.rejected when code 404', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(404, []);

      await store.dispatch(fetchAddReviewAction(mockUserReview));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toContain(fetchAddReviewAction.pending.type);
      expect(actions).toContain(fetchAddReviewAction.rejected.type);
    });
  });
});

