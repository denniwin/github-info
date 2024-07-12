import { configureStore } from "@reduxjs/toolkit";
import repositorySlice from "../../features/repositories/repositorySlice";
import searchSlice from "../../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    repositories: repositorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
