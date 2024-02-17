import { createSlice } from "@reduxjs/toolkit";

export const manaSlice = createSlice({
  name: "mana",
  initialState: {
    max: 400,
    current: 400,
    regen: 25,
  },
  reducers: {
    reduceMana(state, action) {
      state.current -= action.payload;
    },
    addMana(state, action) {
      state.current += action.payload;
    },
  },
});

export const { reduceMana, addMana } = manaSlice.actions;
export default manaSlice.reducer;
