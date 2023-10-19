import { Community } from './create-community';

export interface IFindAllCommunities {
  findAll(): Promise<Community[]>;
}
