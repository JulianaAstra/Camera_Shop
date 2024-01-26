import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history.ts';
import { Middleware } from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer.ts';

export type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'redirectToRoute') {
    browserHistory.push(action.payload);
  }
  return next(action);
};
