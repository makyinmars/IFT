export interface FeedPost {
  id: number;
  body: string;
  createdAt: Date;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imagePath: string;
  role: string;
  feedPosts: FeedPost[];
}
