import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("publication card renders title, authors, then resource actions followed by date and venue", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  const publicationsStart = html.indexOf('id="publications"');
  const publicationsEnd = html.indexOf('id="competitions"', publicationsStart);
  const publications = html.slice(publicationsStart, publicationsEnd);

  const list = publications.indexOf('class="publication-list"');
  const card = publications.indexOf('class="publication-card"');
  const heading = publications.indexOf('class="publication-heading"');
  const title = publications.indexOf('class="publication-title"');
  const authors = publications.indexOf('class="publication-authors"');
  const self = publications.indexOf('class="publication-author-self"');
  const resources = publications.indexOf('class="publication-resources"');
  const pdfAction = publications.indexOf("publication-pdf-link");
  const codeAction = publications.indexOf("publication-code-link");
  const venueAndDate = publications.indexOf('class="publication-period-venue"');

  assert.ok(publicationsStart >= 0 && publicationsEnd > publicationsStart, "publication section should render");
  assert.ok(list >= 0 && card > list, "publications should render as cards");
  assert.ok(heading > card, "the first content row should render inside the card");
  assert.ok(title > heading && authors > title && self > authors, "the title-only first row should be followed by authors and emphasize Yuhang Yang");
  assert.ok(publications.includes("Minghao Chen"), "the placeholder publication should retain a coauthor before Yuhang Yang");
  assert.ok(publications.includes("Zihan Liu"), "the placeholder publication should retain a coauthor after Yuhang Yang");
  assert.ok(resources > authors && pdfAction > resources && codeAction > pdfAction && venueAndDate > codeAction, "PDF, Code, date, and venue should share the third row in that order");
  assert.ok((publications.match(/class="publication-resource-icon"/g) || []).length >= 2, "PDF and Code actions should each include an icon");
  assert.equal(publications.includes("PDF · Unavailable"), false, "unavailable PDF label should stay compact on narrow screens");
  assert.equal(publications.includes("publication-timeline"), false, "the legacy timeline should not render");
  assert.equal(publications.includes('class="content-tags"'), false, "publication topics should not render");
  assert.equal(publications.includes('class="pub-summary"'), false, "publication description should not render");
});

test("publications open with an equal-contribution note and mark co-first authors", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  const publicationsStart = html.indexOf('id="publications"');
  const publicationsEnd = html.indexOf('id="competitions"', publicationsStart);
  const publications = html.slice(publicationsStart, publicationsEnd);

  const note = publications.indexOf('class="publication-note"');
  const list = publications.indexOf('class="publication-list"');

  assert.ok(note > 0 && note < list, "the equal-contribution note should lead the publications section");
  assert.ok(publications.includes("Equal contribution"), "the note should explain equal contribution in English");
  assert.ok(publications.includes("共同贡献"), "the note should explain equal contribution in Chinese");
  assert.equal((publications.match(/class="publication-author-marker"/g) || []).length, 2, "both co-first authors should carry the marker");
  assert.ok(/Minghao Chen<\/span> <sup class="publication-author-marker">/.test(publications), "the marker should follow the co-first author name");
  assert.ok(publications.includes('<span class="publication-author-self">Yuhang Yang</span> <sup class="publication-author-marker">'), "Yuhang Yang should stay emphasized while marked as co-first author");
  assert.equal(publications.includes("Zihan Liu</span> <sup"), false, "non-co-first authors should stay unmarked");
});
