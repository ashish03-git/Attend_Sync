import {createSlice} from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'user_data',
  initialState: {
    data: [],
  },
  reducers: {
    add_data: (state, action) => {
    //   console.log(action.payload);
      state.data = action.payload;
    },
  },
});

export const {add_data} = userDataSlice.actions;
export default userDataSlice.reducer;
