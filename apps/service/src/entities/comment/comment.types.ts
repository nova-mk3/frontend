import { UserProfilePhoto } from "../user/user.type";

export interface Comment {
  id: string;
  authorName: string;
  authorProfilePhoto: UserProfilePhoto;
  children: Comment[];
  content: string;
  modifiedTime: string;
  createdTime: string;
  postId: string;
  authorId: string;
}
