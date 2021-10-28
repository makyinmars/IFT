import { UserEntity } from 'src/auth/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FeedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  imagePath: string;

  @Column({ default: '' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPosts, {
    cascade: true,
  })
  author: UserEntity;
}
