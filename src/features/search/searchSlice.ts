import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialQuery } from "../../shared/utils/getInitialQuery";

export interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: getInitialQuery() || "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;