import { FeedPost } from '../../feed/models/feed.interface';
import { Role } from './role.enum';

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
  feeds?: FeedPost[];
}
