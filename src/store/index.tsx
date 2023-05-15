// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import menuReducer from './menu';
import userReducer from './user';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: {
        menu:menuReducer,
        user:userReducer
    }
});

const { dispatch } = store;

export { store, dispatch };
