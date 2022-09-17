import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiCall} from 'src/repository/networkHelper';
import {
  createTicketRoute,
  getCategoryRoute,
  getDepartmentRoute,
} from 'src/repository/route';

type CreateTicketState = {
  isLoading: boolean | null;
  message: string | null;
  isSuccess: boolean | null;
};

export const getDepartments = createAsyncThunk(
  'getDepartments',
  async ({rejectWithValue}) => {
    try {
      const request = getDepartmentRoute;
      const response = await apiCall(request);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const getCategory = createAsyncThunk(
  'getCategories',
  async (params: any, {rejectWithValue}) => {
    try {
      const request = getCategoryRoute;
      request.params = params;
      const response = await apiCall(request);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const createTicket = createAsyncThunk(
  'createTicket',
  async (data: any, {rejectWithValue}) => {
    try {
      const request = createTicketRoute;
      request.data = data;
      const response = await apiCall(request);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

const createTicketSlice = createSlice<CreateTicketState, {}, 'createTicket'>({
  name: 'createTicket',
  initialState: {
    isLoading: null,
    message: null,
    isSuccess: null,
  },
  reducers: {
    clear(state: CreateTicketState) {
      state.isLoading = false;
      state.message = null;
      state.isSuccess = false;
    },
    setcreateTicket(state: any, action: any) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.isSuccess = action.payload.isSuccess;
    },
  },
});

export default createTicketSlice.reducer;
export const createTicketActions = createTicketSlice.actions;
