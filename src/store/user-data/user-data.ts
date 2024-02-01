import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { UserData } from '../../types/state.ts';
import { fetchAddReviewAction } from '../api-actions.ts';

const initialState: UserData = {
  isUserReviewLoading: false,
};

export const userData = createSlice({
  name: NameSpace.UserData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAddReviewAction.pending, (state) => {
        state.isUserReviewLoading = true;
      })
      .addCase(fetchAddReviewAction.fulfilled, (state) => {
        state.isUserReviewLoading = false;
      });
  }
});
