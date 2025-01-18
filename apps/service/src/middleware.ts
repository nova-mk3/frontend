import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/archive" || pathname === "/archive/") {
    // 이미 page 파라미터가 있는지 확인
    if (!searchParams.has("page")) {
      const url = request.nextUrl.clone();
      url.searchParams.set("page", "1");
      return NextResponse.redirect(url);
    }
  }

  // 다른 경로는 그대로 통과
  return NextResponse.next();
}

// 미들웨어가 적용될 경로를 지정
export const config = {
  matcher: ["/archive", "/archive/"],
};
