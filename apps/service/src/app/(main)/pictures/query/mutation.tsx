import { PicturePost, PicturePostReqeust } from "@/src/api/board/picture";
import { POST_TYPE } from "@/src/constant/board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { postKeys } from "../../board/query/postqueries";
import { UploadFilesAPI } from "@/src/api/board/file";

export function usePictureMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: PicturePostReqeust) => PicturePost(data),
    onSuccess: (data: any) => {
      console.log(data);
      alert("글쓰기 성공");

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
    mutationFn: ({ data, POST_TYPE }: { data: FormData; POST_TYPE: string }) =>
      UploadFilesAPI(data, POST_TYPE),
  });
};
