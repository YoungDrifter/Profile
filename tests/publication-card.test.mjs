import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("publication timeline renders venue/date, title with PDF link, then authors", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  const publicationsStart = html.indexOf('id="publications"');
  const publicationsEnd = html.indexOf('id="competitions"', publicationsStart);
  const publications = html.slice(publicationsStart, publicationsEnd);

  const timeline = publications.indexOf('class="tl publication-timeline"');
  const row = publications.indexOf('class="tl-row publication-row"');
  const venueAndDate = publications.indexOf('class="publication-period-venue"');
  const heading = publications.indexOf('class="publication-heading"');
  const title = publications.indexOf('class="publication-title"');
  const pdfAction = publications.indexOf('class="publication-pdf-link');
  const authors = publications.indexOf('class="publication-authors"');

  assert.ok(publicationsStart >= 0 && publicationsEnd > publicationsStart, "publication section should render");
  assert.ok(timeline >= 0 && row > timeline, "publications should render as a timeline");
  assert.ok(venueAndDate > row, "date and venue should render on the first content row");
  assert.ok(heading > venueAndDate, "title and PDF should render on the second content row");
  assert.ok(title > heading && pdfAction > title, "PDF should follow the title in the heading row");
  assert.ok(authors > pdfAction, "authors should render on the third content row");
  assert.equal(publications.includes("PDF · Unavailable"), false, "unavailable PDF label should stay compact on narrow screens");
  assert.equal(publications.includes("publication-codes-link"), false, "publication code actions should not render");
  assert.equal(publications.includes('class="pub-card publication-card"'), false, "publications should not render as cards");
  assert.equal(publications.includes('class="content-tags"'), false, "publication topics should not render");
  assert.equal(publications.includes('class="pub-summary"'), false, "publication description should not render");
});
