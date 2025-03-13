import {
  RequestCookies,
  ResponseCookies,
} from "next/dist/server/web/spec-extension/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/exam_archive" || pathname === "/exam_archive/") {
    // 이미 page 파라미터가 있는지 확인
    if (!searchParams.has("page")) {
      const url = request.nextUrl.clone();
      url.searchParams.set("page", "1");
      return NextResponse.redirect(url);
    }
  }

  // ✅ `AUTH_TOKEN` 가져오기
  const AuthToken = request.cookies.get("AUTH_TOKEN")?.value;

  // ✅ `AUTH_TOKEN`이 없으면 즉시 `/signin`으로 리디렉트
  if ((pathname.startsWith("/board") || pathname === "/") && !AuthToken) {
    console.log("🔴 AUTH_TOKEN 없음 - 로그인 페이지로 리디렉트");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ `AUTH_TOKEN`이 있을 경우, 응답 쿠키 유지
  const response = NextResponse.next();

  if (AuthToken) {
    response.cookies.set("AUTH_TOKEN", AuthToken);
    applySetCookie(request, response);
  }
  return response;
}

function applySetCookie(req: NextRequest, res: NextResponse): void {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers);
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  // set “request header overrides” on the outgoing response
  NextResponse.next({ request: { headers: newReqHeaders } }).headers.forEach(
    (value, key) => {
      if (
        key === "x-middleware-override-headers" ||
        key.startsWith("x-middleware-request-")
      ) {
        res.headers.set(key, value);
      }
    }
  );
}
