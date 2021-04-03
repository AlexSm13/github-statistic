export interface IRepository {
  updatedAt: string;
  createdAt: string;
  name: string;
  url: string;
  sshUrl: string;
  description: string;
  stargazerCount: number;
  owner: {
    login: string;
    url: string;
  };
  forkCount: number;
  isFork: boolean;
  forks: Fork;
  languages: Language;
  pullRequests: PullRequest;
  issues: Issue;
}

export interface Fork {
  totalCount: number;
  nodes: {
    name: string;
  };
}

export interface Language {
  totalSize: number;
  totalCount: number;
  edges: {
    size: number;
    node: {
      name: string;
    };
  }[];
}

export interface PullRequest {
  totalCount: number;
  nodes: {
    author: {
      login: string;
    };
    number: number;
    title: string;
    closedAt: string;
    createdAt: string;
  }[];
}

export interface Issue {
  totalCount: number;
  nodes: {
    author: {
      login: string;
    };
    number: number;
    title: string;
    closedAt: string;
    createdAt: string;
  }[];
}
