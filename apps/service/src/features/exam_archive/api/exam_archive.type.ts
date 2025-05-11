export interface PostArchiveRequest {
  title: string;
  content: string;
  year: number;
  subject: string;
  semester: string;
  professorName: string;
  fileIds: string[];
  boardId: string;
}

export interface PutArchiveRequest {
  title: string;
  content: string;
  year: number;
  subject: string;
  semester: string;
  professorName: string;
  fileIds: string[];
  boardId: string;
  postId: string;
  deleteFileIds: string[];
}
