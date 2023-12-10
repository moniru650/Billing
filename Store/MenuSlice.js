import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sidebarSize:false
}

const MenuChange=createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        expand(state,action){
            state.sidebarSize=action.payload;
        }
    }
})

export const{expand}=MenuChange.actions;
export default MenuChange.reducer;