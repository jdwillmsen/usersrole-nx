export type Role = 'admin' | 'manager' | 'user' | 'read';
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
