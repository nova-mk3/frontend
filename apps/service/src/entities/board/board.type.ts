import { PostType } from "@/src/constant/board";

export interface Board {
  id: string;
  authorName: string;
  authorProfilePhoto: string;
  title: string;
  content: string;
  type: string;
  createdTime: string;
  modifiedTime: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  href: string;
  ishome: boolean;
}

export interface MainBoard {
  id: string;
  postType: PostType;
  title: string;
  viewCount: number;
  createdTime: string;
}
