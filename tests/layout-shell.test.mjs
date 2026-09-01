import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");

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
  assert.ok(personal.includes("mailto:yuhangyang@smail.nju.edu.cn"), "Personal should repeat Email");
  assert.ok(personal.includes("https://github.com/YoungDrifter"), "Personal should repeat GitHub");
  assert.ok(personal.includes("https://www.zhihu.com/people/emrysyang"), "Personal should repeat Zhihu");
  assert.ok(personal.includes("https://www.linkedin.com/in/yuhangar/"), "Personal should include LinkedIn");
  assert.ok(personal.includes("https://www.youtube.com/@Yuhangar"), "Personal should include YouTube");
  assert.equal((personal.match(/class="personal-link-icon"/g) || []).length, 8, "Personal should render eight icon-only destinations");
  assert.ok(personal.includes('aria-label="X"'), "icon-only X should retain an accessible label");
  assert.ok(personal.includes('aria-label="Xiaohongshu"'), "icon-only Xiaohongshu should retain an accessible label");
  assert.equal(personal.includes('class="personal-link-label"'), false, "Personal social links should not render visible names");

  const orderedLabels = ["Email", "WeChat", "GitHub", "LinkedIn", "Zhihu", "YouTube", "X", "Xiaohongshu"];
  const positions = orderedLabels.map((label) => personal.indexOf(`aria-label="${label}"`));
  assert.ok(positions.every((position) => position >= 0), "every Elsewhere icon should have an accessible label");
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b), "Elsewhere icons should follow the approved order");
  assert.ok(personal.includes("data-wechat-trigger"), "WeChat should open an in-page QR dialog");
  assert.ok(personal.includes('data-wechat-modal role="dialog" aria-modal="true"'), "WeChat QR should use a modal dialog");
  assert.ok(personal.includes('<img src="/wechat_id_code.jpg"'), "WeChat dialog should render the published QR image");
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

test("the narrow language switch keeps symmetric horizontal padding", () => {
  const narrowStart = css.indexOf("@media (max-width: 860px)");
  const narrowEnd = css.indexOf("@media (max-width: 440px)", narrowStart);
  const narrowCss = css.slice(narrowStart, narrowEnd);
  const languageStart = narrowCss.indexOf(".header-language {");
  const languageEnd = narrowCss.indexOf("}", languageStart);
  const languageRule = narrowCss.slice(languageStart, languageEnd);

  assert.ok(languageRule.includes("padding-inline: 8px"), "narrow language control should use equal left and right padding");
  assert.equal(languageRule.includes("padding-left: 0"), false, "narrow language control should not remove only its left padding");
});

test("internships follow the education-style title, period, position, and description rows", () => {
  const internshipsStart = html.indexOf('id="internships"');
  const internshipsEnd = html.indexOf('id="publications"', internshipsStart);
  const internships = html.slice(internshipsStart, internshipsEnd);
  const row = internships.indexOf('class="internship-row"');
  const title = internships.indexOf('class="internship-title"');
  const period = internships.indexOf('class="internship-period"');
  const position = internships.indexOf('class="internship-position"');
  const descriptions = internships.indexOf('class="internship-descriptions"');

  assert.ok(row >= 0, "internship should have an education-style first row");
  assert.ok(title > row && period > title, "internship name should precede its right-aligned period");
  assert.ok(position > period, "position should render on the second row");
  assert.ok(descriptions > position, "description rows should follow the position");
  assert.equal(internships.includes("tl-description-list"), false, "internship descriptions should no longer use bullets");
});

test("competitions and honors place names left, periods right, and omit awarding organizations", () => {
  for (const [id, nextId] of [["competitions", "honors"], ["honors", "personal"]]) {
    const start = html.indexOf(`id="${id}"`);
    const end = html.indexOf(`id="${nextId}"`, start + 10);
    const section = html.slice(start, end);
    const row = section.indexOf('class="award-item"');
    const name = section.indexOf('class="award-name"');
    const period = section.indexOf('class="award-yr"');

    assert.ok(row >= 0 && name > row && period > name, `${id} should render name before right-aligned period`);
    assert.equal(section.includes('class="award-org"'), false, `${id} should not render awarding organizations`);
  }
});
