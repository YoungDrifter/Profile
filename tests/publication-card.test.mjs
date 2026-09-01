import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("publication card renders title with date and venue, then multiple authors and resource actions", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  const publicationsStart = html.indexOf('id="publications"');
  const publicationsEnd = html.indexOf('id="competitions"', publicationsStart);
  const publications = html.slice(publicationsStart, publicationsEnd);

  const list = publications.indexOf('class="publication-list"');
  const card = publications.indexOf('class="publication-card"');
  const venueAndDate = publications.indexOf('class="publication-period-venue"');
  const heading = publications.indexOf('class="publication-heading"');
  const title = publications.indexOf('class="publication-title"');
  const pdfAction = publications.indexOf("publication-pdf-link");
  const authors = publications.indexOf('class="publication-authors"');
  const self = publications.indexOf('class="publication-author-self"');
  const resources = publications.indexOf('class="publication-resources"');
  const codeAction = publications.indexOf("publication-code-link");

  assert.ok(publicationsStart >= 0 && publicationsEnd > publicationsStart, "publication section should render");
  assert.ok(list >= 0 && card > list, "publications should render as cards");
  assert.ok(heading > card, "the first content row should render inside the card");
  assert.ok(title > heading && venueAndDate > title, "title should appear left of date and venue on the first row");
  assert.ok(authors > venueAndDate && self > authors, "multiple authors should follow the first row and emphasize Yuhang Yang");
  assert.ok(publications.includes("Minghao Chen"), "the placeholder publication should retain a coauthor before Yuhang Yang");
  assert.ok(publications.includes("Zihan Liu"), "the placeholder publication should retain a coauthor after Yuhang Yang");
  assert.ok(resources > authors && pdfAction > resources && codeAction > pdfAction, "PDF and Code should share a resource row below the authors");
  assert.equal(publications.includes("PDF · Unavailable"), false, "unavailable PDF label should stay compact on narrow screens");
  assert.equal(publications.includes("publication-timeline"), false, "the legacy timeline should not render");
  assert.equal(publications.includes('class="content-tags"'), false, "publication topics should not render");
  assert.equal(publications.includes('class="pub-summary"'), false, "publication description should not render");
});
