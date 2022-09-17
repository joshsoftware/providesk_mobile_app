import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiCall} from 'src/repository/networkHelper';
import { ticketRoute } from 'src/repository/route';

type TicketState = {
  pendingTickets: object | null;
  isPendingTicketsReqLoading: boolean | null;
  resolvedTickets: object | null;
  isResolvedTicketsReqLoading: boolean | null;
};

export const getAllTickets = createAsyncThunk(
  'getAllTickets',
  async (params: any, {rejectWithValue}) => {
    try {
      const request = ticketRoute;
      request.params = params;
      const response = await apiCall(request);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

const ticketSlice = createSlice<TicketState, {}, 'getAllTickets'>({
  name: 'getAllTickets',
  initialState: {
    pendingTickets: null,
    isPendingTicketsReqLoading: false,
    resolvedTickets: null,
    isResolvedTicketsReqLoading: false,
  },
  reducers: {
    clear(state: TicketState) {
      state.pendingTickets = null;
      state.isPendingTicketsReqLoading = false;
      state.resolvedTickets = null;
      state.isResolvedTicketsReqLoading = false;
    },
    setPendingTicketsData(state: any, action: any) {
      state.pendingTickets = action.payload.pendingTickets;
      state.isPendingTicketsReqLoading = false;
    },
    setResolvedTicketsData(state: any, action: any) {
      state.resolvedTickets = action.payload.resolvedTickets;
      state.isResolvedTicketsReqLoading = false;
    },
  },
});

export default ticketSlice.reducer;
export const TicketActions = ticketSlice.actions;
