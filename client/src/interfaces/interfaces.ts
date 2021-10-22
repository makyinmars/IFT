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
  imagePath: string;
  role: string;
}
export interface UserResponse {
  user: User;
  exp: number;
  iat: number;
}

export interface Author {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  imagePath: string;
}

export interface FeedResponse {
  id?: number;
  body: string;
  createdAt?: Date;
  author: Author;
}

export interface FeedPosts {
  id: number;
  body: string;
  createdAt: Date;
  author: Author;
}
