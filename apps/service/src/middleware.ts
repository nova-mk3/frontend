import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./api/auth";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const AuthToken = request.cookies.get("AUTH_TOKEN")?.value;
  const response = NextResponse.next();

  //토큰이 존재할때 토큰 만료여부 확인
  if (AuthToken) {
    const data = await verifyAccessToken(AuthToken);
    console.log(data);

    // 토큰이 만료되면 리다이렉트
    if (data.status === 500 && !pathname.startsWith("/signin")) {
      return NextResponse.redirect(
        new URL(`/signin?redirect=${pathname + search}`, request.url)
      );
    } else if (data.status === 200) {
      if (pathname.startsWith("/signin")) {
        const prevPage = request.headers.get("referer"); // 🔥 이전 페이지 가져오기

        // 이전페이지가 없으면 null이 나옴
        if (prevPage) {
          return NextResponse.redirect(prevPage); // 🔥 이전 페이지로 이동
        }
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // 원래 이거없으면 쿠키 안넘어갔는데, 내가 코드를 잘못짰던거같기도... 없어도 api에서 쿠키가져오는데 큰 문제 없음!
    // response.cookies.set("AUTH_TOKEN", AuthToken);
    // applySetCookie(request, response);

    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|signup|api).*)"],
};

// function applySetCookie(req: NextRequest, res: NextResponse): void {
//   // parse the outgoing Set-Cookie header
//   const setCookies = new ResponseCookies(res.headers);
//   // Build a new Cookie header for the request by adding the setCookies
//   const newReqHeaders = new Headers(req.headers);
//   const newReqCookies = new RequestCookies(newReqHeaders);
//   setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
//   // set “request header overrides” on the outgoing response
//   NextResponse.next({ request: { headers: newReqHeaders } }).headers.forEach(
//     (value, key) => {
//       if (
//         key === "x-middleware-override-headers" ||
//         key.startsWith("x-middleware-request-")
//       ) {
//         res.headers.set(key, value);
//       }
//     }
//   );
// }
