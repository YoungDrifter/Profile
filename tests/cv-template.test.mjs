import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function readCvFile(path) {
  return readFile(new URL(path, projectRoot), "utf8");
}

test("CV sections follow the approved academic order", async () => {
  const source = await readCvFile("public/cv/yuhang_yang_cv.tex");
  const expected = [
    "Education",
    "Research Interests",
    "Projects",
    "Competitions",
    "Honors",
    "Technical Skills",
  ];

  const actual = [...source.matchAll(/\\cvsection\{([^}]+)\}/g)].map((match) => match[1]);
  assert.deepEqual(actual, expected);
});

test("project entries keep role separate from technical context", async () => {
  const [style, source] = await Promise.all([
    readCvFile("public/cv/cv.sty"),
    readCvFile("public/cv/yuhang_yang_cv.tex"),
  ]);

  assert.match(style, /\\NewDocumentEnvironment\{cvproject\}\{O\{\} m m m m\}/);
  assert.ok(
    source.includes(
      "{min-GPT: A From-Scratch Conversational GPT}{Independent Developer}{PyTorch · GPT-2 · DailyDialog · W\\&B}",
    ),
  );
  assert.ok(source.includes("并加载 DialoGPT-small 预训练权重"));
});

test("dated achievements use a right-aligned date API", async () => {
  const [style, source] = await Promise.all([
    readCvFile("public/cv/cv.sty"),
    readCvFile("public/cv/yuhang_yang_cv.tex"),
  ]);

  assert.match(style, /\\NewDocumentCommand\{\\cvdateditem\}\{m m\}/);
  assert.equal((source.match(/\\cvdateditem\{/g) ?? []).length, 3);
  assert.equal(source.includes("\\cvitem{2025}"), false);
});

test("CJK body uses real Songti regular and bold fonts", async () => {
  const style = await readCvFile("public/cv/cv.sty");

  assert.ok(style.includes("\\IfFontExistsTF{Songti SC}"));
  assert.ok(style.includes("\\setCJKmainfont{Songti SC}"));
  assert.ok(style.includes("BoldFont={Songti SC Bold}"));
  assert.ok(style.includes("\\setCJKmainfont{FandolSong-Regular.otf}"));
  assert.ok(style.includes("BoldFont=FandolSong-Bold.otf"));
  assert.equal(style.includes("AutoFakeBold"), false);
});

test("section headings reserve enough space for the first entry", async () => {
  const style = await readCvFile("public/cv/cv.sty");

  assert.match(style, /\\newcommand\{\\cvsection\}\[1\]\{[\s\S]*?\\needspace\{7\\baselineskip\}/);
});

test("public CV omits placeholder papers while the style keeps the publication API", async () => {
  const [style, source] = await Promise.all([
    readCvFile("public/cv/cv.sty"),
    readCvFile("public/cv/yuhang_yang_cv.tex"),
  ]);

  assert.match(style, /\\NewDocumentCommand\{\\cvpublication\}\{O\{\} m m m m\}/);
  assert.equal(source.includes("Placeholder Paper"), false);
  assert.equal(source.includes("\\cvsection{Publications}"), false);
});
