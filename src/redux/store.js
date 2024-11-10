import {configureStore} from "@reduxjs/toolkit"
import authSlice from './reducers/auth';
import miscSlice from "./reducers/misc";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [miscSlice.name]: miscSlice.reducer,
    },

});


export default store;