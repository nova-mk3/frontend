export const POST_TYPE = {
  EXAM_ARCHIVE: "EXAM_ARCHIVE",
  FREE: "FREE",
  INTRODUCTION: "INTRODUCTION",
  NOTICE: "NOTICE",
  PICTURES: "PICTURES",
  QNA: "QNA",
  SUGGESTION: "SUGGESTION",
  ALL: "ALL",
} as const;

export type PostType = (typeof POST_TYPE)[keyof typeof POST_TYPE];

export const POST_TYPE_OPTIONS = [
  {
    value: POST_TYPE.QNA,
    label: "Q&A",
  },
  {
    value: POST_TYPE.NOTICE,
    label: "공지사항",
  },
  {
    value: POST_TYPE.FREE,
    label: "자유게시판",
  },
  {
    value: POST_TYPE.INTRODUCTION,
    label: "자기소개",
  },
];

export const BOARD_SIZE = 5;

export const POST_TYPE_LABEL: Record<PostType, string> = {
  EXAM_ARCHIVE: "족보게시판",
  FREE: "자유게시판",
  INTRODUCTION: "자기소개",
  NOTICE: "공지사항",
  PICTURES: "사진게시판",
  QNA: "Q&A",
  SUGGESTION: "건의함",
  ALL: "전체글보기",
};

const isProd = process.env.NODE_ENV === "production";

export const INTEGRATED = isProd
  ? "0e8f938b-b653-4dd5-bf0e-c6e48bb5128e"
  : "03cbc040-fb83-46f7-9118-f637e9c14679"; //여기에 로컬변수

export const CLUB_ARCHIVE = isProd
  ? "d0335ade-1ccb-42be-a64c-a1159624c09d"
  : "15ae2c32-f158-49f4-850b-b55b5c55ec67"; //여기에 로컬변수
