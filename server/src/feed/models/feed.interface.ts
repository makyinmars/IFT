import { User } from '../../auth/models/user.interface';

export interface FeedPost {
  id?: number;
  imagePath?: string;
  body?: string;
  createdAt?: Date;
  author?: User;
}
