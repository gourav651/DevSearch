export interface ParsedPage {
  title: string;
  content: string;
  links: string[];
}

export interface CrawlResult {
  url: string;
  title: string;
  content: string;
  contentHash: string;
}