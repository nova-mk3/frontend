export const blurDataURL = `data:image/svg+xml;base64,${btoa(`
    <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e5e5"/>
    </svg>
  `)}`;

export const imageUrlProxy = (url: string) => {
  return url.replace(
    "https://nova.cbnu.ac.kr/files/public",
    "/proxy/files/public"
  );
};
