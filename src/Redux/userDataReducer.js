import {createSlice} from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'user_data',
  initialState: {
    data: [],
    available_dates: {},
  },
  reducers: {
    add_data: (state, action) => {
      //   console.log(action.payload);
      state.data = action.payload;
    },
    add_available_dates: (state, action) => {
      state.available_dates = action.payload;
    },
  },
});

export const {add_data,add_available_dates} = userDataSlice.actions;
export default userDataSlice.reducer;
