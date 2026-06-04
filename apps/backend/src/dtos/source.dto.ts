import { Source } from "@prisma/client";

export interface SourceResponseDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export const toSourceDto = (
  source: Source
): SourceResponseDto => ({
  id: source.id,
  name: source.name,
  slug: source.slug,
  description: source.description,
});