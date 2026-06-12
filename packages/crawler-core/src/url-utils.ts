export function normalizeUrl(url: string) {
  const normalized = new URL(url);

  normalized.hash = "";

  let normalizedUrl = normalized.toString();

  if (
    normalizedUrl.endsWith("/") &&
    normalizedUrl.length > normalized.origin.length + 1
  ) {
    normalizedUrl = normalizedUrl.slice(0, -1);
  }

  return normalizedUrl;
}

export function isSameDomain(
  url: string,
  baseUrl: string
) {
  return (
    new URL(url).hostname ===
    new URL(baseUrl).hostname
  );
}

export function toAbsoluteUrl(
  href: string,
  baseUrl: string
) {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return null;
  }
}

export function isDocumentationUrl(
  url: string,
  docsPath: string
) {
  return url.startsWith(docsPath);
}