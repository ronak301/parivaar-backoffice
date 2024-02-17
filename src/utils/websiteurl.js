export const weburl = (url) => {
  if (url == null) {
    return;
  }
  if (
    typeof url === "string" &&
    !url?.startsWith("http") &&
    !url?.startsWith("https")
  ) {
    url = `https://${url}`;
  }
  return url;
};
