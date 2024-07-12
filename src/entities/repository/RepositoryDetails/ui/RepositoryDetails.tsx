import { GET_REPOSITORY } from "@/graphql/queries";
import { Badge } from "@/shared/components/Badge";
import { ErrorMessage } from "@/shared/components/Error";
import { LoadingSpinner } from "@/shared/components/Spinner";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import "../styles/RepositoryDetails.scss";

export const RepositoryDetails = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { owner, name },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const { repository } = data;

  return (
    <div className="repository-details">
      <h1 className="repository-details__name">{repository.name}</h1>
      <div className="repository-details__info">
        <div className="repository-details__about">
          <p>
            Owner:{" "}
            <a
              href={repository.owner.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repository.owner.login}
            </a>
          </p>
          <p>
            Rating:{" "}
            <span className="repository-details__rating">
              {repository.stargazerCount} stars
            </span>{" "}
          </p>
          <p>
            Last updated: {new Date(repository.updatedAt).toLocaleDateString()}
          </p>
          <p>Stack:</p>
          <div className="repository-details__stack">
            {repository.languages.nodes.map((language: { name: string }) => (
              <Badge key={language.name} item={language.name} />
            ))}
          </div>
        </div>
        <div className="repository-details__avatar">
          <img
            src={repository.owner.avatarUrl}
            alt={`${repository.owner.login}'s avatar`}
          />
        </div>
      </div>
      <p>Description: {repository.description}</p>
    </div>
  );
};
