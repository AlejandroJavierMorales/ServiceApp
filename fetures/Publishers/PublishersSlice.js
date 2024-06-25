import { createSlice } from "@reduxjs/toolkit";


export const publishersSlice = createSlice({
    name: "publishers",
    initialState: {
      value: {
        publishers:[],
        publisher:{}
      }
    },
    reducers: {
      setPublishers: (state, action) => {
        state.value.publishers = action.payload;
      },
      setPublisher: (state, action) => {
        state.value.publisher = action.payload;
      }
    },
  });
  
  export const {
    setPublishers,
    setPublisher
} = publishersSlice.actions;
  export default publishersSlice.reducer;