import { configureStore } from "@reduxjs/toolkit";
import  dataOfServerReducer from "../fetures/DataOfServer/DataOfServerSlice";
import servicesReducer from "../fetures/Services/ServicesSlice";
import publishersReducer from "../fetures/Publishers/PublishersSlice";


export default configureStore({
    reducer: {
        dataOfServer: dataOfServerReducer,
        services: servicesReducer,
        publishers: publishersReducer,
    }
})
