import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.ts';
import { appData } from './app-data/app-data.ts';
// import { userData } from './user-data/user-data';
// import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
  // [NameSpace.UserData]: userData.reducer,
  // [NameSpace.UserProcess]: userProcess.reducer,
});
