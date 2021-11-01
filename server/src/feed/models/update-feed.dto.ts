import { User } from 'src/auth/models/user.interface';

export class UpdateFeedPostDto {
  imagePath?: string;
  body?: string;
  author: User;
}
