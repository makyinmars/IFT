export interface FeedPosts {
  id?: number;
  body: string;
  createdAt?: Date;
}

export interface GetUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imagePath?: string;
  role: string;
  feedPosts?: FeedPosts[];
}

