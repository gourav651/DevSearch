import { Page, Source } from "@prisma/client";

export interface SearchResultDto {
  id: string;
  title: string;
  url: string;
  snippet: string;
  source: {
    name: string;
    slug: string;
  };
}

type SearchPage = Page & {
  source: Source;
};

export const toSearchDto = (
  page: SearchPage
): SearchResultDto => ({
  id: page.id,
  title: page.title,
  url: page.url,
  snippet: page.content.slice(0, 120),
  source: {
    name: page.source.name,
    slug: page.source.slug,
  },
});