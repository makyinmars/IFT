import { FeedPost } from 'src/feed/models/feed.interface';
import { Role } from './role.enum';

export class UpdateUserDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  imagePath?: string;
  role?: Role;
  posts?: FeedPost[];
}
