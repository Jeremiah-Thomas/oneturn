import { createSlice } from "@reduxjs/toolkit";

export const manaSlice = createSlice({
  name: "mana",
  initialState: {
    max: 448,
    current: 448,
    regen: 22,
  },
  reducers: {
    reduceMana(state, action) {
      state.current -= parseInt(action.payload)
    },
    addMana(state, action) {
      state.current += parseInt(action.payload)
    },
    changeMax(state, action) {
      state.max = parseInt(action.payload)
    },
    changeCurrent(state, action) {
      state.current = parseInt(action.payload)
    },
    changeRegen(state, action){
      state.regen = parseInt(action.payload)
    }
  },
});

export const { reduceMana, addMana, changeCurrent, changeMax, changeRegen } = manaSlice.actions;
export default manaSlice.reducer;
