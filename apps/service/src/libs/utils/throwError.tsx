
export const throwErrorMessage = (error : any)=>{
    if (error.response) {
        const message = error.response.data?.message || "서버에서 에러가 발생했습니다.";
        throw new Error(message);
      } else if (error.request) {
        throw new Error("서버에 응답이 없습니다. 네트워크 상태를 확인하세요.");
      } else {
        throw new Error(error.message || "에러가 발생했습니다.");
      }
}