export interface IRepository {
  updatedAt: string;
  createdAt: string;
  name: string;
  url: string;
  sshUrl: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  isFork: boolean;
  forks: {
    totalCount: number;
    nodes: {
      name: string;
    };
  };
  languages: {
    totalSize: number;
    totalCount: number;
    edges: {
      size: number;
      node: {
        name: string;
      };
    }[];
  };
  pullRequests: {
    totalCount: number;
    nodes: {
      author: {
        login: string;
      };
      closedAt: string;
      createdAt: string;
    }[];
  };
  issues: {
    totalCount: number;
    nodes: {
      author: {
        login: string;
      };
      closedAt: string;
      createdAt: string;
    }[];
  };
}
