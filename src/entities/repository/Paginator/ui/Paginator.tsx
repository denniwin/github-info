import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchRepositories,
  setCursor,
  setPage,
} from "@/features/repositories/repositorySlice";

import "../styles/Paginator.scss";

export const Paginator = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.search);
  const { page } = useAppSelector((state) => state.repositories);
  const totalCount = useAppSelector((state) => state.repositories.totalCount);
  const totalPages = totalCount <= 100 ? Math.ceil(totalCount / 10) : 10;

  const handlePageClick = (pageNumber: number) => () => {
    if (page === pageNumber) return;
    const first = 10;
    const after =
      pageNumber > 1 ? window.btoa(`cursor:${(pageNumber - 1) * 10}`) : "";
    dispatch(setPage(pageNumber));
    dispatch(fetchRepositories({ query, first, after }));
    dispatch(setCursor(after));
    localStorage.setItem("page", `${pageNumber}`);
    localStorage.setItem("cursor", after);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className={`pagination__item ${page === index + 1 ? "current" : ""}`}
          key={index + 1}
          onClick={handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
