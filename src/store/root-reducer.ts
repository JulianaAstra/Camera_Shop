import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.ts';
import { appData } from './app-data/app-data.ts';
import { userData } from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
  [NameSpace.UserData]: userData.reducer,
});
