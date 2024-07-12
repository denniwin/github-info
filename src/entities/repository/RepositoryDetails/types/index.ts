export type Language = {
  name: string;
};

export type Owner = {
  login: string;
  url: string;
  avatarUrl: string;
};

export type Repository = {
  name: string;
  owner: Owner;
  stargazerCount: number;
  updatedAt: string;
  languages: {
    nodes: Language[];
  };
  description: string;
};

export type RepositoryData = {
  repository: Repository;
};

export type RepositoryVars = {
  owner: string;
  name: string;
};

export type RepositoryDetailsParams = {
  owner: string;
  name: string;
};
