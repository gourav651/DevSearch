import axios from "axios";
import { parseHtml } from "./html-parser";
import {
  isDocumentationUrl,
  isSameDomain,
  normalizeUrl,
} from "./url-utils";

export class CrawlEngine {
  async crawl(url: string) {
    const response = await axios.get(url);

    const page = parseHtml(
      response.data,
      url
    );

    page.links = page.links.filter(
      (link) =>
        isSameDomain(link, url) &&
        isDocumentationUrl(
          link,
          "https://redis.io/docs"
        )
    );

    return page;
  }

  async crawlSite(
    startUrl: string,
    maxPages = 10
  ) {
    const queue = [startUrl];

    const visited =
      new Set<string>();

    const pages = [];

    while (
      queue.length > 0 &&
      visited.size < maxPages
    ) {
      const currentUrl =
        queue.shift();

      if (!currentUrl) continue;

      const normalizedUrl =
        normalizeUrl(currentUrl);

      if (
        visited.has(normalizedUrl)
      ) {
        continue;
      }

      visited.add(normalizedUrl);

      const page =
        await this.crawl(
          normalizedUrl
        );

      pages.push({
        url: normalizedUrl,
        title: page.title,
        content: page.content,
      });

      for (const link of page.links) {
        const normalizedLink =
          normalizeUrl(link);

        if (
          !visited.has(
            normalizedLink
          )
        ) {
          queue.push(
            normalizedLink
          );
        }
      }
    }

    return pages;
  }
}