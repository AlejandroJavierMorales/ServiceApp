import { configureStore } from "@reduxjs/toolkit";
import dataOfServerReducer from "../fetures/DataOfServer/DataOfServerSlice";
import servicesReducer from "../fetures/Services/ServicesSlice";
import publishersReducer from "../fetures/Publishers/PublishersSlice";
import authReducer from '../fetures/User/UserSlice';
import todoReducer from '../fetures/ToDo/TodoSlice';


import { rubrosApi } from "../services/rubrosServices";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authService";
import { todoApi } from "../services/toDoService";


const store = configureStore({
    reducer: {
        dataOfServer: dataOfServerReducer,
        services: servicesReducer,
        publishers: publishersReducer,
        auth: authReducer,
        [rubrosApi.reducerPath]: rubrosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        todo: todoReducer,
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(rubrosApi.middleware)
        .concat(authApi.middleware)
        .concat(todoApi.middleware)

})

setupListeners(store.dispatch)

export default store