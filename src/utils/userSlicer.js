import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action)=> {
            return action.payload;           // initially the state is null when the addUser action hits the state have the user data  on the store
        },
        removeUser: ()=> {
            return null;                    //remove the state on the store
        }
    }
});

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;