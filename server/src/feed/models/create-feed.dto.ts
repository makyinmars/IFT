import { User } from 'src/auth/models/user.class';

export class CreateFeedPostDto {
  imagePath?: string;
  body: string;
  author: User;
}
