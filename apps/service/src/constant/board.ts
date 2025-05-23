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
export type PostType = keyof typeof POST_TYPE;

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
  EXAM_ARCHIVE: "자료게시판",
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
  ? "7b59772b-32d3-4157-8adf-aafb099a2a9b"
  : "7661181e-491b-49ba-a2a9-c13e09393534"; //여기에 로컬변수

export const CLUB_ARCHIVE = isProd
  ? "5949f734-918b-4cea-aabc-f90e874ce34e"
  : "196128e0-4533-4cd9-ae01-a7a0806cd48c"; //여기에 로컬변수

export const POST_TYPE_TITLE_LABEL: Record<PostType, string> = {
  EXAM_ARCHIVE: "자료",
  FREE: "자유",
  INTRODUCTION: "소개",
  NOTICE: "공지",
  PICTURES: "사진",
  QNA: "QA",
  SUGGESTION: "건의",
  ALL: "전체글보기",
};
