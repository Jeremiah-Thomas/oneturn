import { createSlice } from "@reduxjs/toolkit";

export const healthSlice = createSlice({
    name: "health",
    initialState: {
        max: 82,
        current: 82,
        regen: 25
    },
    reducers:{
        reduceHealth(state, action) {
            state.current -= parseInt(action.payload)
        },
        addHealth(state, action) {
            state.current += parseInt(action.payload)
        },
        changeMax(state, action){
            state.max = parseInt(action.payload)
        },
        changeCurrent(state, action){
            state.current = parseInt(action.payload)
        },
        changeRegen(state, action){
            state.regen = parseInt(action.payload)
        }
    }
})

export const {reduceHealth, addHealth, changeCurrent, changeMax, changeRegen} = healthSlice.actions
export default healthSlice.reducer