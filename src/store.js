import { configureStore } from "@reduxjs/toolkit";
import monstersReducer from "./slices/monstersSlice";
import manaReducer from "./slices/manaSlice";
import healthReducer from "./slices/healthSlice"

export default configureStore({
  reducer: {
    monsters: monstersReducer,
    mana: manaReducer,
    health: healthReducer
  },
});
