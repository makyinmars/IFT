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
  createdAt?: string;
  author: Author;
}

export interface FeedPosts {
  id: number;
  body: string;
  createdAt: string;
  author: Author;
}

// Returns individual post of the Author without the Author on the response
export interface FeedPostsResponse {
  id: number;
  body: string;
  createdAt: string;
}

// Different that UserResponse because this returns with FeedPosts from the Author
// without the author parameter
export interface UserAllResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imagePath?: string;
  role: string;
  feedPosts: FeedPostsResponse[];
}
