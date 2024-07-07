import { configureStore } from "@reduxjs/toolkit";
import dataOfServerReducer from "../fetures/DataOfServer/DataOfServerSlice";
import servicesReducer from "../fetures/Services/ServicesSlice";
import publishersReducer from "../fetures/Publishers/PublishersSlice";
import authReducer from '../fetures/User/UserSlice';
import todoReducer from '../fetures/ToDo/TodoSlice';
import subscriptionsReducer from "../fetures/Subscriptions/SubscriptionsSlice";

import { setupListeners } from "@reduxjs/toolkit/query";

import { rubrosApi } from "../services/rubrosServices";
import { authApi } from "../services/authService";
import { todoApi } from "../services/toDoService";
import { subscriptionsApi } from "../services/subscriptionsService";
import { userApi } from "../services/userService";

const store = configureStore({
    reducer: {
        dataOfServer: dataOfServerReducer,
        services: servicesReducer,
        publishers: publishersReducer,
        auth: authReducer,
        todo: todoReducer,
        subscriptions: subscriptionsReducer,
        [rubrosApi.reducerPath]: rubrosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(rubrosApi.middleware)
        .concat(authApi.middleware)
        .concat(todoApi.middleware)
        .concat(subscriptionsApi.middleware)
        .concat(userApi.middleware)
});

setupListeners(store.dispatch);

export default store;
