import * as cheerio from "cheerio";
import { ParsedPage } from "./crawler.types";
import { toAbsoluteUrl } from "./url-utils";

export function parseHtml(html: string, baseUrl: string): ParsedPage {
  const $ = cheerio.load(html);

  const title = $("h1").first().text().trim() || $("title").text().trim();

  const content = $("body").text().trim();

  const links: string[] = [];

  $("a").each((_, element) => {
    const href = $(element).attr("href");

    if (!href) return;

    const absoluteUrl = toAbsoluteUrl(href, "https://redis.io");

    if (absoluteUrl) {
      links.push(absoluteUrl);
    }
  });

  const uniqueLinks = [...new Set(links)];
  return {
    title,
    content,
    links: uniqueLinks,
  };
}
