import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("public assets use a root avatar without legacy image or files directories", async () => {
  await access(new URL("public/avatar.png", projectRoot));
  await assert.rejects(access(new URL("public/images", projectRoot)));
  await assert.rejects(access(new URL("public/files", projectRoot)));

  const html = await readFile(new URL("dist/index.html", projectRoot), "utf8");
  assert.ok(html.includes('<img src="/avatar.png"'), "rendered avatar should load from the public root");
  assert.equal(html.includes("/images/avatar.png"), false, "legacy avatar path should not render");
});
