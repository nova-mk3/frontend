import {
  PicturePost,
  PicturePostReqeust,
  PicturePutRequest,
  PicturePut,
} from "@/src/api/board/picture";
import { POST_TYPE, PostType } from "@/src/constant/board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { postKeys } from "../../board/query/postqueries";
import { UploadFilesAPI } from "@/src/api/board/file";

export function usePicturePostMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: PicturePostReqeust) => PicturePost(data),
    onSuccess: (data: any) => {
      router.push(`/${POST_TYPE.PICTURES.toLowerCase()}/${data.id}`);

      // 내가 쓴 글의 리스트 무효화
      queryClient.invalidateQueries({
        queryKey: postKeys.typelists(POST_TYPE.PICTURES),
        refetchType: "inactive",
      });
    },
    onError: (error: any) => {
      alert(error.message);
      console.log(error);
    },
  });
}

export const useFileUploadMutation = () => {
  return useMutation({
    mutationFn: ({
      data,
      POST_TYPE,
    }: {
      data: FormData;
      POST_TYPE: PostType;
    }) => UploadFilesAPI(data, POST_TYPE),
  });
};

export function usePicturePutMutation({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: PicturePutRequest) => PicturePut(data),
    onSuccess: (data: any) => {
      console.log(data);
      alert("변경 성공");

      // 내 수정사항은 나만 다시보면 된다 -> api 호출 최적화
      // 캐시가 바로 수정되어 이동전에 수정된 캐시값으로 랜더링되서 보인다.. 사용자 경험을 해친다
      // queryClient.setQueryData(postKeys.detail(postId), data);
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(postId),
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.typelists(POST_TYPE.PICTURES),
        refetchType: "inactive",
      });

      router.push(`/pictures/${data.id}`);
    },
    onError: (error) => {
      alert(error.message);
      console.log(error);
    },
  });
}
