import {configureStore} from '@reduxjs/toolkit';
import userDataSlice from './userDataReducer';

const store = configureStore({
  reducer: {
    user_data: userDataSlice,
  },
});

export default store;
