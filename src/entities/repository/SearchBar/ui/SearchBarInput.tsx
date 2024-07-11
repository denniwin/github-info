import { memo } from "react";

type SearchBarInputProps = {
  query: string;
  handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBarInput = memo(
  ({ query, handleChangeQuery }: SearchBarInputProps) => {
    return (
      <input
        type="search"
        value={query}
        onChange={(e) => handleChangeQuery(e)}
        placeholder="Search GitHub"
      />
    );
  }
);
