import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setValue} from '@utils/storage';
// import {apiCall} from 'src/repository/networkHelper';
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
      request.data = data;
      // const response = await apiCall(request);

      /**
       * Mock Api response
       */
      const response = {
        status: 200,
        data: {
          data: {
            auth_token: 'abadfasdasdgasdf',
            name: 'Tanmay Thole',
          },
        },
      };

      if (response?.status === 200) {
        setValue('token', response?.data?.data?.auth_token);
        setValue('username', response?.data?.data?.name);
      }
      return response?.data;
    } catch (error) {
      console.log(error);
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
  },
});

export default userSlice.reducer;
export const UserActions = userSlice.actions;
