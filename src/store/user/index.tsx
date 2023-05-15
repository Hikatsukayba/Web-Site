
// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState: UserState = {
    user: null,
  };
  

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state,action)=>{
            state.user=action.payload
        },
        clearUser:(state)=>{
            localStorage.setItem('token','');
            state.user=null;
        }
    }
        
});

export default user.reducer;
export const {setUser,clearUser}=user.actions

