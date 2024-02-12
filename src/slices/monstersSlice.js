import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;

export const getMonsterData = createAsyncThunk("monsters/get", async () => {
  try {
    const res = await axios.get(`/get`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

export const addMonster = createAsyncThunk("monsters/add", async (monster) => {
  try {
    const res = await axios.post(`/add`, monster);
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

export const addAffliction = createAsyncThunk(
  "monsters/addAffliction",
  async (affliction) => {
    try {
      const res = await axios.patch(`/update/${affliction.mon_id}`, {
        afflictions: affliction.new_affliction,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteMonster = createAsyncThunk("monsters/delete", async (id) => {
  try {
    const res = await axios.delete(`/delete/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

export const passDoom = createAsyncThunk(
  "monsters/passDoom",
  async (monster) => {
    try {
      const newAfflictions = monster.afflictions
        .map((affliction) => {
          if (affliction) {
            if (
              affliction.name !== "Doom" &&
              affliction.name !== "Abyssal Mal"
            ) {
              return {
                ...affliction,
                stacks: affliction.stacks + 1,
                cur_duration: affliction.max_duration,
              };
            } else if (affliction.name !== "Doom") {
              return { ...affliction, cur_duration: affliction.max_duration };
            } else {
              return { ...affliction };
            }
          } else {
            return null;
          }
        })
        .filter((affliction) => {
          return affliction !== null;
        });
      const res = await axios.patch(`/update/${monster._id}`, {
        afflictions: newAfflictions,
        doom: true,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const passAbyssal = createAsyncThunk(
  "monsters/passAbyssal",
  async (monster) => {
    try {
      const res = await axios.patch(`/update/${monster._id}`, {
        abyssal_mal: true,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateMonster = createAsyncThunk(
  "monsters/update",
  async (monster) => {
    try {
      const newAfflictions = monster.afflictions
        .map((affliction) => {
          if (!affliction.hasOwnProperty("max_duration")) {
            return { ...affliction };
          } else if (affliction.cur_duration - 1 <= 0) {
            return null;
          } else {
            return { ...affliction, cur_duration: affliction.cur_duration - 1 };
          }
        })
        .filter((affliction) => {
          return affliction !== null;
        });

      let res;
      if (monster.doom && monster.abyssal_mal) {
        const updateData = {
          afflictions: newAfflictions,
          doom: false,
          abyssal_mal: false,
        };
        res = await axios.patch(`/update/${monster._id}`, updateData);
      } else if (monster.doom) {
        const updateData = { afflictions: newAfflictions, doom: false };
        res = await axios.patch(`/update/${monster._id}`, updateData);
      } else if (monster.abyssal_mal) {
        const updateData = { afflictions: newAfflictions, abyssal_mal: false };
        res = await axios.patch(`/update/${monster._id}`, updateData);
      } else {
        const updateData = { afflictions: newAfflictions };
        res = await axios.patch(`/update/${monster._id}`, updateData);
      }

      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const monstersSlice = createSlice({
  name: "monsters",
  initialState: {
    monsters: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonsterData.fulfilled, (state, action) => {
        state.monsters = action.payload;
      })
      .addCase(addMonster.fulfilled, (state, action) => {
        state.monsters.push(action.payload);
      })
      .addCase(addAffliction.fulfilled, (state, action) => {
        state.monsters = [
          action.payload,
          ...state.monsters.filter((monster) => {
            return monster._id !== action.payload._id;
          }),
        ];
      })
      .addCase(deleteMonster.fulfilled, (state, action) => {
        state.monsters = state.monsters.filter((monster) => {
          return monster._id !== action.payload._id;
        });
      })
      .addCase(updateMonster.fulfilled, (state, action) => {
        state.monsters = [
          action.payload,
          ...state.monsters.filter((monster) => {
            return monster._id !== action.payload._id;
          }),
        ];
      })
      .addCase(passDoom.fulfilled, (state, action) => {
        state.monsters = [
          action.payload,
          ...state.monsters.filter((monster) => {
            console.error(action.action);
            return monster._id !== action.payload._id;
          }),
        ];
      })
      .addCase(passAbyssal.fulfilled, (state, action) => {
        state.monsters = [
          action.payload,
          ...state.monsters.filter((monster) => {
            return monster._id !== action.payload._id;
          }),
        ];
      });
  },
});

export const { nextRound } = monstersSlice.actions;
export default monstersSlice.reducer;
