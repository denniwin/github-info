import { lazy } from "react";

export const HomePage = lazy(() =>
  import("@/pages/Home").then(({ HomePage }) => ({
    default: HomePage,
  }))
);

export const RepositoryPage = lazy(() =>
  import("@/pages/RepoDetail").then(({ RepositoryPage }) => ({
    default: RepositoryPage,
  }))
);
