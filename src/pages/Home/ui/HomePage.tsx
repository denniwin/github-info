import { Paginator } from "@/entities/repository/Paginator";
import { RepositoryList } from "@/entities/repository/RepositoryList";
import { SearchBar } from "@/entities/repository/SearchBar";

export const HomePage = () => {
  return (
    <>
      <SearchBar />
      <RepositoryList />
      <Paginator />
    </>
  );
};
