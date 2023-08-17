import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ESelects {
  N_TIMES = 'nTimes',
  MOD = 'mod',
}

export interface ISides {
  id: number;
  value: string;
}

interface IResultList {
  total: number;
  nTimes: number;
  mod: number;
  sides: ISides;
  time: string;
}

interface IStore {
  nTimes: number;
  mod: number;
  sides: ISides;
  resultList: IResultList[];
}

const initialState: IStore = {
  nTimes: 1,
  mod: 0,
  sides: {
    id: 4,
    value: 'd4',
  },
  resultList: [],
};

const rollSlice = createSlice({
  name: 'rollSlice',
  initialState,
  reducers: {
    onSelectChange: (
      state: IStore,
      { payload }: PayloadAction<{ type: ESelects; value: number }>
    ) => {
      state[payload.type] = payload.value;
    },
    onRollChange: (state: IStore, { payload }: PayloadAction<ISides>) => {
      state.sides = payload;
    },
    onResultListAdd: (
      state: IStore,
      { payload }: PayloadAction<IResultList>
    ) => {
      state.resultList.unshift(payload);
    },
  },
});

export const rollSliceActions = rollSlice.actions;
export default rollSlice;
