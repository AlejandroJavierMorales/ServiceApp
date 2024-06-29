import { createSlice } from '@reduxjs/toolkit';
import { todoApi } from '../../services/toDoService';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(todoApi.endpoints.getTodos.matchFulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addMatcher(todoApi.endpoints.addTodo.matchFulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default todoSlice.reducer;
