import { User } from 'src/auth/models/user.interface';

export class CreateFeedPostDto {
  body: string;
  author: User;
}
