import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const cvDirectory = fileURLToPath(new URL("../public/cv/", import.meta.url));
const publishedPdf = process.env.CV_PDF_PATH
  ? path.resolve(process.env.CV_PDF_PATH)
  : path.join(cvDirectory, "yuhang_yang_cv.pdf");

let buildDirectory;
let rebuiltPdf;

async function run(command, args, options = {}) {
  const result = await execFileAsync(command, args, {
    cwd: cvDirectory,
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
    ...options,
  });
  return `${result.stdout}${result.stderr}`;
}

async function extractText(pdf) {
  return run("gs", [
    "-dSAFER",
    "-dBATCH",
    "-dNOPAUSE",
    "-sDEVICE=txtwrite",
    "-o",
    "-",
    pdf,
  ]);
}

async function renderPdf(pdf, output) {
  await run("gs", [
    "-dSAFER",
    "-dBATCH",
    "-dNOPAUSE",
    "-sDEVICE=png16m",
    "-r72",
    "-o",
    output,
    pdf,
  ]);
}

function normalizeText(value) {
  return value.replace(/\s+/gu, "");
}

test.before(async () => {
  buildDirectory = await mkdtemp(path.join(tmpdir(), "profile-cv-test-"));
  await run("latexmk", [
    "-xelatex",
    "-gg",
    "-interaction=nonstopmode",
    "-halt-on-error",
    `-output-directory=${buildDirectory}`,
    "yuhang_yang_cv.tex",
  ]);
  rebuiltPdf = path.join(buildDirectory, "yuhang_yang_cv.pdf");
});

test.after(async () => {
  await rm(buildDirectory, { recursive: true, force: true });
});

test("published CV matches a fresh XeLaTeX build", async () => {
  const [publishedText, rebuiltText] = await Promise.all([
    extractText(publishedPdf),
    extractText(rebuiltPdf),
  ]);

  assert.equal(normalizeText(publishedText), normalizeText(rebuiltText));
});

test("published CV renders identically to a fresh XeLaTeX build", async () => {
  const publishedPng = path.join(buildDirectory, "published.png");
  const rebuiltPng = path.join(buildDirectory, "rebuilt.png");
  await Promise.all([
    renderPdf(publishedPdf, publishedPng),
    renderPdf(rebuiltPdf, rebuiltPng),
  ]);

  const [publishedImage, rebuiltImage] = await Promise.all([
    readFile(publishedPng),
    readFile(rebuiltPng),
  ]);
  assert.deepEqual(publishedImage, rebuiltImage);
});

test("published CV is one A4 page with the expected links and embedded real fonts", async () => {
  const [info, urls, fontInfo] = await Promise.all([
    run("pdfinfo", [publishedPdf]),
    run("pdfinfo", ["-url", publishedPdf]),
    run("gs", ["-dPDFINFO", "-dBATCH", "-dNOPAUSE", publishedPdf]),
  ]);

  assert.match(info, /^Pages:\s+1$/m);
  assert.match(info, /^Page size:\s+595\.28 x 841\.89 pts \(A4\)$/m);
  for (const uri of [
    "tel:(+86)19358466910",
    "mailto:yuhangyang@smail.nju.edu.cn",
    "https://yuhangyang.site",
    "https://github.com/YoungDrifter/min-GPT",
  ]) {
    assert.ok(urls.includes(uri), `missing PDF link: ${uri}`);
  }
  assert.match(fontInfo, /STSongti-SC-Regular[\s\S]*Embedded/);
  assert.match(fontInfo, /STSongti-SC-Bold[\s\S]*Embedded/);
  assert.equal(fontInfo.includes("AutoFakeBold"), false);
});

test("rendered CV contains the complete academic section sequence", async () => {
  const text = normalizeText(await extractText(publishedPdf));
  const expected = [
    "EDUCATION",
    "RESEARCHINTERESTS",
    "PROJECTS",
    "COMPETITIONS",
    "HONORS",
    "TECHNICALSKILLS",
  ];
  const positions = expected.map((heading) => text.indexOf(heading));

  assert.ok(positions.every((position) => position >= 0), "missing rendered CV section");
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  for (const content of [
    "IndependentDeveloper",
    "AFrom-ScratchConversationalGPT",
    "全国大学生数学竞赛",
    "南京大学人民奖学金二等奖",
  ]) {
    assert.ok(text.includes(content), `missing rendered CV content: ${content}`);
  }
});

test("dated achievements share the rendered right-side date axis", async () => {
  const lines = (await extractText(publishedPdf)).split(/\r?\n/u);
  const labels = ["SecondPrize", "ThirdPrize", "南京大学人民奖学金"];
  const dateColumns = labels.map((label) => {
    const line = lines.find((candidate) => candidate.includes(label));
    assert.ok(line, `missing dated line: ${label}`);
    assert.match(line, /\s{10,}2025\s*$/u);
    return line.lastIndexOf("2025");
  });

  assert.deepEqual(dateColumns, [dateColumns[0], dateColumns[0], dateColumns[0]]);
});

test("project role uses the right metadata column", async () => {
  const lines = (await extractText(publishedPdf)).split(/\r?\n/u);
  const projectLine = lines.find(
    (line) => line.includes("PyTorch") && line.includes("Independent"),
  );

  assert.ok(projectLine, "missing project metadata line");
  assert.match(projectLine, /W&B\s{10,}Independent\s*Developer\s*$/u);
});
