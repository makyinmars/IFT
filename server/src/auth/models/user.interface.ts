import { Feed } from 'src/feed/interfaces/feed.interface';
import { Role } from '../enums/role.enum';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
  feeds?: Feed[];
}
