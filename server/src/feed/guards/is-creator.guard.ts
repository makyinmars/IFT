import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/auth/models/user.interface';
import { UserService } from 'src/auth/services/user.service';
import { FeedService } from '../services/feed.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  // Need the Id of the post and id of the author
  constructor(
    private userService: UserService,
    private feedService: FeedService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user, params }: { user: User; params: { id: number } } = request;

    // If not user or params then it wont execute
    if (!user || !params) return false;

    // Allow admins to get make request
    if (user.role === 'admin') return true;

    const userId = user.id;
    const feedId = params.id;

    // If logged-in user is the same as the one who created the post
    const userFound = await this.userService.findUserById(userId);
    const postFound = await this.feedService.findPostById(feedId);

    // if author id matches author post id, return true
    const isAuthor = userFound.id === postFound.author.id;
    return isAuthor;
  }
}
