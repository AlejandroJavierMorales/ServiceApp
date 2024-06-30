import { createSlice } from "@reduxjs/toolkit";


export const servicesSlice = createSlice({
    name: "services",
    initialState: {
      value: {
        categories:[],
        subCategories:[],
        subSubCategories:[],
        subCategoriesSelected:null,
        subSubCategoriesSelected:null,
        categorySelected:null,
        subCategorySelected:null,
        subSubCategorySelected:null,
        subscriptions:[] //guarda todas las subscripciones de publishers de todos los rubros 
      },
    },
    reducers: {
      setCategories: (state, action) => {
        state.value.categories = action.payload;
      },
      setSubCategories: (state, action) => {
        state.value.subCategories = action.payload;
      },
      setSubSubCategories: (state, action) => {
        state.value.subSubCategories = action.payload;
      },
      setSubCategoriesSelected: (state, action) => {
        state.value.subCategoriesSelected = action.payload;
      },
      setSubSubCategoriesSelected: (state, action) => {
        state.value.subSubCategoriesSelected = action.payload;
      },
      setCategorySelected: (state, action) => {
        state.value.categorySelected = action.payload;
      },
      setSubCategorySelected: (state, action) => {
        state.value.subCategorySelected = action.payload;
      },
      setSubSubCategorySelected: (state, action) => {
        state.value.subSubCategorySelected = action.payload;
      },
      setSubscriptions: (state, action) => {
        state.value.subscriptions = action.payload;
      },
    },
  });
  
  export const {
    setCategories, 
    setSubCategories,
    setSubSubCategories,
    setSubCategoriesSelected,
    setSubSubCategoriesSelected,
    setCategorySelected,
    setSubCategorySelected,
    setSubSubCategorySelected,
    setSubscriptions
} = servicesSlice.actions;
  export default servicesSlice.reducer;