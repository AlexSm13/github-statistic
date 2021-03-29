import { IRepository } from "./IRepository";

export interface IUserInfo {
  login: string;
  name: string;
  avatarUrl: string;
  company: string;
  location: string;
  url: string;
  websiteUrl: string;
  organization: {
    name: string;
  };
  email: string;
  bio: string;
  repositories: {
    totalCount: number;
    nodes: IRepository[];
  };
}
