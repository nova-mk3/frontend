export interface ExamArchive {
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
  fileContentCount: number;
  totalFileDownloadCount: number;
}
