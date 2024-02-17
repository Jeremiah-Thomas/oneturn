import { configureStore } from "@reduxjs/toolkit";
import monstersReducer from "./slices/monstersSlice";
import manaReducer from "./slices/manaSlice";

export default configureStore({
  reducer: {
    monsters: monstersReducer,
    mana: manaReducer,
  },
});
