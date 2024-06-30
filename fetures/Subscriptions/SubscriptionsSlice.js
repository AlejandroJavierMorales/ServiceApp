import { createSlice } from '@reduxjs/toolkit';
import { subscriptionsApi } from '../../services/subscriptionsService';

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(subscriptionsApi.endpoints.getPublishers.matchFulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addMatcher(subscriptionsApi.endpoints.getSubscriptions.matchFulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addMatcher(subscriptionsApi.endpoints.getSubscriptionsCategories.matchFulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addMatcher(subscriptionsApi.endpoints.getSubscriptions_Type.matchFulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default subscriptionsSlice.reducer;

