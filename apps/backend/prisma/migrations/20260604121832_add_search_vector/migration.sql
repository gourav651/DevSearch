-- AlterTable
ALTER TABLE "pages"
ADD COLUMN "searchVector" tsvector;

UPDATE "pages"
SET "searchVector" =
to_tsvector(
  'english',
  coalesce(title, '') || ' ' || coalesce(content, '')
);

CREATE INDEX pages_search_vector_idx
ON "pages"
USING GIN("searchVector");