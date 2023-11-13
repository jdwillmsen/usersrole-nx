import { Role } from './roles.model';

export type User = {
  uid: string;
  displayName: string;
  roles: Role[];
  email: string;
};
export type CreateUserRequest = {
  displayName: string;
  password: string;
  email: string;
  roles: Role[];
};
export type UpdateUserRequest = { uid: string } & CreateUserRequest;
export type DeleteUserRequest = { uid: string };
export type ActionType = 'Create' | 'View' | 'Delete' | 'Edit' | 'Unknown';
export type UserFormType = {
  title: string;
  user: User;
  type: ActionType;
};
export type UpdateUserRolesRequest = { uid: string; roles: Role[] };
