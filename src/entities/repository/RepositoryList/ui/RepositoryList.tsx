import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchRepositories,
  selectCursor,
  selectError,
  selectLoading,
  selectRepositories,
  setPage,
} from "@/features/repositories/repositorySlice";
import { setQuery } from "@/features/search/searchSlice";
import { ErrorMessage } from "@/shared/components/Error";
import { LoadingSpinner } from "@/shared/components/Spinner";
import { WrapperMessage } from "@/shared/components/WrapperMessage";
import { getInitialPage } from "@/shared/utils/getInitialPage";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/RepositoryList.scss";

export const RepositoryList = () => {
  const currentUser = "denniwin";
  const dispatch = useAppDispatch();
  const repositories = useAppSelector(selectRepositories);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const cursor = useAppSelector(selectCursor);
  const query = useAppSelector((state) => state.search.query);
  const page = useAppSelector((state) => state.repositories.page);

  const fetchData = useCallback(() => {
    if (query) {
      dispatch(setPage(+getInitialPage()));
      dispatch(fetchRepositories({ query, first: 10, after: cursor || "" }));
    } else {
      dispatch(setPage(1));
      localStorage.setItem("page", `1`);
      localStorage.setItem("cursor", "");
      localStorage.setItem("query", `user:${currentUser}`);
      dispatch(setQuery(`user:${currentUser}`));
      dispatch(
        fetchRepositories({
          query: `user:${currentUser}`,
          first: 10,
          after: "",
        })
      );
    }
  }, [dispatch, query, cursor, currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startIndex = (page - 1) * 10;
  const repositoriesToShow = repositories;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={`Error: ${error}`} />;

  if (!repositoriesToShow.length)
    return (
      <WrapperMessage>
        <div>Your search did not match any repositories</div>
      </WrapperMessage>
    );

  return (
    <div className="repository-list">
      {repositoriesToShow.map(
        ({ id, name, stargazerCount, owner, updatedAt, url }, index) => (
          <div key={id} className="repository-list__item">
            {startIndex + index + 1}.{" "}
            <Link to={`/repository/${owner.login}/${name}`}>{name}</Link> -{" "}
            {stargazerCount} stars - last updated at{" "}
            {new Date(updatedAt).toLocaleDateString()} -{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        )
      )}
    </div>
  );
};
