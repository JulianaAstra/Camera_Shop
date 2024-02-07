import { expect } from 'vitest';
import { userData, testInitialUserDataState } from './user-data';
import { fetchAddReviewAction } from '../api-actions';

describe('UserData Slice', () => {

  const initialState = {
    ...testInitialUserDataState,
  };

  it('should return initial state when action is empty', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialUserDataState,
    };
    const result = userData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state when state is undefined', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialUserDataState,
    };
    const result = userData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return user review data loading status true when data is loading', () => {
    const expectedState = {
      ...testInitialUserDataState,
      isUserReviewLoading: true,
    };

    const result = userData.reducer(initialState, fetchAddReviewAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should return user review data loading status false when data has loaded', () => {
    const expectedState = {
      ...testInitialUserDataState,
      isUserReviewLoading: false,
    };

    const result = userData.reducer(initialState, fetchAddReviewAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});

