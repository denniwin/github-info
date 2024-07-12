import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { useAppDispatch } from "@/app/hooks";
import { setPage } from "@/features/repositories/repositorySlice";
import { setQuery } from "@/features/search/searchSlice";
import { useDebounce } from "@/shared/hooks/useDebounce";

import { SearchBarInput } from "./SearchBarInput";

import "../styles/SearchBar.scss";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [query, setQueryInput] = useState(localStorage.getItem("query") || "");
  const [realQuery, setRealQuery] = useState(query);
  const debouncedQuery = useDebounce(realQuery, 500);

  const handleChangeQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setQueryInput(text);

      if (text !== "user:denniwin") {
        setRealQuery(text);
        dispatch(setPage(1));
        localStorage.setItem("page", `1`);
        localStorage.setItem("cursor", "");
      }
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    if (query === "user:denniwin") {
      setQueryInput("");
    }
  }, [query]);

  useEffect(() => {
    dispatch(setQuery(debouncedQuery));
    localStorage.setItem("query", debouncedQuery);
  }, [debouncedQuery, dispatch]);

  return (
    <div className="searchBar">
      <div className="searchBar__field">
        <SearchBarInput handleChangeQuery={handleChangeQuery} query={query} />
      </div>
    </div>
  );
};
