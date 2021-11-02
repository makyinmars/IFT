import { User } from '../../auth/models/user.class';

export interface FeedPost {
  id?: number;
  imagePath?: string;
  body?: string;
  createdAt?: Date;
  author?: User;
}
