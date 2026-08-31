import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

test("global navigation wraps home, section navigation, and language controls above the two-pane shell", () => {
  const header = html.indexOf('class="site-header"');
  const home = html.indexOf("data-home-trigger", header);
  const section = html.indexOf("data-section-trigger", header);
  const language = html.indexOf("data-language-button", header);
  const shell = html.indexOf('class="shell"');

  assert.ok(header >= 0, "a global site header should render");
  assert.ok(home > header, "the header should expose a Home control");
  assert.ok(section > home, "the header should expose a narrow-screen Section control");
  assert.ok(language > section, "language controls should live in the global header");
  assert.ok(shell > language, "the two-pane shell should render below the global header");
});

test("sidebar keeps primary contacts while personal owns secondary social links", () => {
  const sidebarStart = html.indexOf('class="sidebar"');
  const sidebarEnd = html.indexOf("</aside>", sidebarStart);
  const sidebar = html.slice(sidebarStart, sidebarEnd);
  const personalStart = html.indexOf('id="personal"');
  const personal = html.slice(personalStart);

  assert.ok(sidebar.includes("mailto:yuhangyang@smail.nju.edu.cn"), "email should stay in the sidebar");
  assert.equal(sidebar.includes("Expected 2028"), false, "major and graduation year should not render in the sidebar");
  assert.equal(sidebar.includes("预计 2028 年毕业"), false, "Chinese major and graduation year should not render in the sidebar");
  const emailStart = sidebar.indexOf('class="s-link s-email-link"');
  const emailEnd = sidebar.indexOf("</a>", emailStart);
  const emailLink = sidebar.slice(emailStart, emailEnd);
  assert.ok(emailLink.includes(">Email<"), "the email row should use the concise Email label");
  assert.equal(emailLink.includes(">yuhangyang@smail.nju.edu.cn<"), false, "the email address should not be exposed as visible copy");
  assert.ok(sidebar.includes("https://github.com/YoungDrifter"), "GitHub should stay in the sidebar");
  assert.ok(sidebar.includes("https://www.zhihu.com/people/emrysyang"), "Zhihu should stay in the sidebar");
  assert.equal(sidebar.includes("https://x.com/Yuhangar"), false, "X should leave the sidebar");
  assert.equal(sidebar.includes("xiaohongshu.com"), false, "Xiaohongshu should leave the sidebar");

  assert.ok(personalStart >= 0, "Personal should render as a section");
  assert.ok(personal.includes("https://x.com/Yuhangar"), "Personal should include X");
  assert.ok(personal.includes("xiaohongshu.com"), "Personal should include Xiaohongshu");
  assert.equal((personal.match(/class="personal-link-icon"/g) || []).length, 2, "Personal social links should render two brand icons");
  assert.ok(personal.includes('aria-label="X"'), "icon-only X should retain an accessible label");
  assert.ok(personal.includes('aria-label="Xiaohongshu"'), "icon-only Xiaohongshu should retain an accessible label");
  assert.equal(personal.includes('class="personal-link-label"'), false, "Personal social links should not render visible names");
});

test("publications use the refined project-card presentation", () => {
  const publicationsStart = html.indexOf('id="publications"');
  const publicationsEnd = html.indexOf('id="competitions"', publicationsStart);
  const publications = html.slice(publicationsStart, publicationsEnd);

  assert.ok(publications.includes('class="publication-card"'), "publication content should render in a card");
  assert.equal(publications.includes('class="publication-timeline"'), false, "the old publication timeline wrapper should be removed");
  assert.ok(publications.includes("publication-pdf-link"), "the publication card should retain its PDF action");
  assert.ok(publications.includes("publication-code-link"), "the publication card should expose a Code action");
  assert.ok(publications.includes('class="publication-author-self"'), "the profile owner should be emphasized among multiple authors");
});

test("personal follows honors and renders life, collaboration, and elsewhere content", () => {
  const honors = html.indexOf('id="honors"');
  const personal = html.indexOf('id="personal"');
  const elsewhere = html.indexOf('class="personal-links"', personal);

  assert.ok(honors >= 0 && personal > honors, "Personal should follow Honors");
  assert.ok(html.indexOf('class="personal-life"', personal) > personal, "Personal should render the life introduction");
  assert.ok(html.indexOf('class="personal-collaboration"', personal) > personal, "Personal should render collaboration copy");
  assert.ok(elsewhere > personal, "Personal should render Elsewhere links");
});

test("projects are absent from both navigation and page content", () => {
  assert.equal(html.includes('href="#projects"'), false, "navigation should not link to Projects");
  assert.equal(html.includes('id="projects"'), false, "the Projects section should not render");
  assert.equal(html.includes("project-repository-link"), false, "project repository actions should not render");
});
