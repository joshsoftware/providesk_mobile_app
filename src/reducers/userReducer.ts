import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setValue} from '@utils/storage';
import {apiCall} from 'src/repository/networkHelper';
import {authRoute} from 'src/repository/route';

type UserState = {
  token: string | null;
  username: string | null;
};

export const authenticateUser = createAsyncThunk(
  'authenticateUser',
  async (data: any, {rejectWithValue}) => {
    try {
      const request = authRoute;
      request.data = {user: data};
      delete request.user;
      const response = await apiCall(request);

      if (response?.status === 200) {
        setValue('token', response?.data?.data?.auth_token);
        setValue('username', data?.name);
      }

      return response?.data;
    } catch (error) {
      console.log('err', error);
      return rejectWithValue(error);
    }
  },
);

const userSlice = createSlice<UserState, {}, 'userInfo'>({
  name: 'userInfo',
  initialState: {
    token: null,
    username: null,
  },
  reducers: {
    clear(state: UserState) {
      state.token = null;
      state.username = null;
    },
    setUser(state: any, action: any) {
      state.isLoggedIn = action.payload.token === null ? false : true;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
  },
});

export default userSlice.reducer;
export const UserActions = userSlice.actions;
