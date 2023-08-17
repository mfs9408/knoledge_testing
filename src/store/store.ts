import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rollSlice from './slice';

const reducer = combineReducers({
  rollReducer: rollSlice.reducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export { store };
