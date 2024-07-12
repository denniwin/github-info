import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { client } from "@/graphql";
import { SEARCH_REPOSITORIES } from "@/graphql/queries";
import { getInitialCursor } from "@/shared/utils/getInitialCursor";
import { getInitialPage } from "@/shared/utils/getInitialPage";
export interface RepositoryState {
  repositories: Repository[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  endCursor: string;
  cursor: string | null;
  hasNextPage: boolean;
  page: number;
}

const initialState: RepositoryState = {
  repositories: [],
  totalCount: 0,
  loading: false,
  error: null,
  endCursor: "",
  cursor: getInitialCursor(),
  hasNextPage: false,
  page: +getInitialPage() || 1,
};

interface FetchRepositoriesArgs {
  query: string;
  first: number;
  after?: string;
}

interface Repository {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

interface FetchRepositoriesResponse {
  repositoryCount: number;
  edges: { node: Repository }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
}

export const fetchRepositories = createAsyncThunk<
  FetchRepositoriesResponse,
  FetchRepositoriesArgs,
  { state: RootState }
>("repositories/fetchRepositories", async ({ query, first, after }) => {
  const response = await client.query({
    query: SEARCH_REPOSITORIES,
    variables: { query, first, after },
    fetchPolicy: "no-cache",
  });

  return response.data.search;
});

export const repositorySlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCursor: (state, action: PayloadAction<string | null>) => {
      state.cursor = action.payload;
    },
    setRepositories: (state) => {
      state.repositories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.repositories = [];
      })
      .addCase(
        fetchRepositories.fulfilled,
        (state, action: PayloadAction<FetchRepositoriesResponse>) => {
          state.loading = false;
          if (action.payload.pageInfo.endCursor) {
            state.endCursor = action.payload.pageInfo.endCursor;
          }
          state.repositories = action.payload.edges.map((edge) => edge.node);
          state.totalCount = action.payload.repositoryCount;
          state.hasNextPage = action.payload.pageInfo.hasNextPage;
        }
      )
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch repositories";
      });
  },
});
export const selectRepositories = (state: RootState) =>
  state.repositories.repositories;
export const selectTotalCount = (state: RootState) =>
  state.repositories.totalCount;
export const selectLoading = (state: RootState) => state.repositories.loading;
export const selectError = (state: RootState) => state.repositories.error;
export const selectEndCursor = (state: RootState) =>
  state.repositories.endCursor;
export const selectHasNextPage = (state: RootState) =>
  state.repositories.hasNextPage;
export const selectCursor = (state: RootState) => state.repositories.cursor;

export const { setPage, setRepositories, setCursor } = repositorySlice.actions;
export default repositorySlice.reducer;
