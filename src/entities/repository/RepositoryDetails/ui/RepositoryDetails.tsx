import { useParams } from "react-router-dom";

import { Badge } from "@/shared/components/Badge";
import { ErrorMessage } from "@/shared/components/Error";
import { LoadingSpinner } from "@/shared/components/Spinner";
import { useTitle } from "@/shared/hooks/useTitle";
import { useFetchRepositoryData } from "../hooks/useFetchRepositoryData";
import { RepositoryDetailsParams } from "../types";

import "../styles/RepositoryDetails.scss";

export const RepositoryDetails = () => {
  const { owner = "", name = "" } = useParams<RepositoryDetailsParams>();
  const {
    data: repository,
    loading,
    error,
  } = useFetchRepositoryData(owner, name);

  const infoRepository = `${owner} | ${name}`;
  const ratingForTitle =
    `\u2605 ${repository?.stargazerCount.toString()}` || "";

  useTitle(infoRepository, ratingForTitle);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  if (!repository) {
    return <ErrorMessage message="Repository not found" />;
  }

  const {
    name: nameRepo,
    description,
    stargazerCount,
    updatedAt,
    owner: { avatarUrl, login, url },
    languages: { nodes: languages },
  } = repository;

  return (
    <section>
      <div className="container">
        <div className="repository-details">
          <h1 className="repository-details__name">{nameRepo}</h1>
          <div className="repository-details__info">
            <div className="repository-details__about">
              {owner && (
                <p>
                  Owner:{" "}
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {login}
                  </a>
                </p>
              )}
              <p>
                Rating:{" "}
                <span className="repository-details__rating">
                  {stargazerCount} stars
                </span>
              </p>
              <p>Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
              {!!languages.length && (
                <>
                  <p>Stack:</p>
                  <div className="repository-details__stack">
                    {languages.map((language) => (
                      <Badge key={language.name} item={language.name} />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="repository-details__avatar">
              <img src={avatarUrl} alt={`${login}'s avatar`} />
            </div>
          </div>
          {description && <p>Description: {description}</p>}
        </div>
      </div>
    </section>
  );
};
