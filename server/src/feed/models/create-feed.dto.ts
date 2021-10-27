import { User } from 'src/auth/models/user.interface';

export class CreateFeedPostDto {
  imagePath: string;
  body: string;
  author: User;
}
