import { User } from '@/types/User';

export type Post = {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  userId: string;
  user?: User;
};

export type Posts = {
  posts: Post[];
};
