import { configureStore } from "@reduxjs/toolkit";
import billListReducer from "./modules/billListStore";

const store = configureStore({
    reducer: {
        billList: billListReducer
    }
})

export default store