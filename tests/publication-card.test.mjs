import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("publication card renders metadata, then left-to-right PDF and Codes actions without topics or description", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  const publicationsStart = html.indexOf('id="publications"');
  const publicationsEnd = html.indexOf('id="competitions"', publicationsStart);
  const publications = html.slice(publicationsStart, publicationsEnd);

  const title = publications.indexOf('class="pub-title publication-title"');
  const authors = publications.indexOf('class="publication-authors"');
  const venueAndDate = publications.indexOf('class="pub-meta publication-venue-date"');
  const actions = publications.indexOf('class="publication-actions"');
  const pdfAction = publications.indexOf('class="pub-action card-resource-action publication-pdf-link');
  const codesAction = publications.indexOf('class="pub-action card-resource-action publication-codes-link');

  assert.ok(publicationsStart >= 0 && publicationsEnd > publicationsStart, "publication section should render");
  assert.ok(title >= 0, "publication title should have its own row");
  assert.ok(authors > title, "authors should render on the row after the title");
  assert.ok(venueAndDate > authors, "venue/date should render on the row after authors");
  assert.ok(actions > venueAndDate, "resource actions should have their own final row");
  assert.ok(pdfAction > actions, "PDF should be the first action on the final row");
  assert.ok(codesAction > pdfAction, "Codes should follow PDF from left to right");
  assert.equal(publications.includes("PDF · Unavailable"), false, "unavailable PDF label should stay compact on narrow screens");
  assert.equal(publications.includes("Codes · Unavailable"), false, "unavailable Codes label should stay compact on narrow screens");
  assert.equal(publications.includes('class="content-tags"'), false, "publication topics should not render");
  assert.equal(publications.includes('class="pub-summary"'), false, "publication description should not render");
});
