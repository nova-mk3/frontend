export const POST_TYPE = {
    EXAM_ARCHIVE: "EXAM_ARCHIVE",
    FREE: "FREE",
    INTRODUCTION: "INTRODUCTION",
    NOTICE: "NOTICE",
    PICTURES: "PICTURES",
    QNA: "QNA",
    SUGGESTION: "SUGGESTION",
} as const;

export type PostType = typeof POST_TYPE[keyof typeof POST_TYPE];

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

export const BOARD_SIZE=5;