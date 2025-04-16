import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: 'connections',
    initialState: null,
    reducers: {
        addListOfUsers : (state, action)=> {
            return action.payload;
        },
        removeListOfUsers: ()=> {
            return null;
        }
    }
})

export const { addListOfUsers, removeListOfUsers } = userDataSlice.actions
export default userDataSlice.reducer