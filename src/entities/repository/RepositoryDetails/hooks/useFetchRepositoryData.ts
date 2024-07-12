import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "@/graphql/queries";

import { RepositoryData, RepositoryVars } from "../types";
export const useFetchRepositoryData = (owner: string, name: string) => {
  const { data, loading, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_REPOSITORY,
    {
      variables: { owner, name },
    }
  );

  return {
    data: data?.repository,
    loading,
    error,
  };
};
