import { createSlice } from "@reduxjs/toolkit";


export const dataOfServerSlice = createSlice({
    name: "dataOfServer",
    initialState: {
      value: [],
    },
    reducers: {
      setData: (state, action) => {
        state.value = action.payload;
      },
      resetData: (state, action) => {
        state.value =[];
      }
    },
  });
  
  export const {setData, resetData} = dataOfServerSlice.actions;
  export default dataOfServerSlice.reducer;
  