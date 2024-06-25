import { configureStore } from "@reduxjs/toolkit";
import  dataOfServerReducer from "../fetures/DataOfServer/DataOfServerSlice";
import servicesReducer from "../fetures/Services/ServicesSlice";

import counterReducer from "../fetures/Counter/CounterSlice";
import shopReducer from "../fetures/Shop/ShopSlice";

export default configureStore({
    reducer: {
        dataOfServer: dataOfServerReducer,
        services: servicesReducer,
        counter: counterReducer,
        shop: shopReducer,
    }
})
