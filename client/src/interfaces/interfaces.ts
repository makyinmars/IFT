export interface Status {
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
export interface UserResponse {
  user: User;
  exp: number;
  iat: number;
}
