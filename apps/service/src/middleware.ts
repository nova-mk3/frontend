import {
  RequestCookies,
  ResponseCookies,
} from "next/dist/server/web/spec-extension/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./api/auth";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ✅ `AUTH_TOKEN` 가져오기
  const AuthToken = request.cookies.get("AUTH_TOKEN")?.value;
  const response = NextResponse.next();

  if (AuthToken === undefined) {
    if (pathname.startsWith("/users")) {
      console.log("🔴 AUTH_TOKEN 없음 - 로그인 페이지로 리디렉트");
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    const data = await verifyAccessToken(AuthToken);

    console.log(data);

    if (data.status === 500) {
      const loginUrl = new URL("/signin", request.url);
      loginUrl.searchParams.set(
        "redirect",
        decodeURIComponent(pathname) + search
      ); // 이전 URL 저장
      return NextResponse.redirect(loginUrl);
    }

    response.cookies.set("AUTH_TOKEN", AuthToken);
    applySetCookie(request, response);
  }

  return response;
}

export const config = {
  matcher: ["/((?!signin|signup).*)"],
};

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
