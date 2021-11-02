import { User } from 'src/auth/models/user.class';

export class UpdateFeedPostDto {
  imagePath?: string;
  body?: string;
  author: User;
}
