import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {},
  reducers: {},
});

export default userSlice.reducer;
export const UserActions = userSlice.actions;
