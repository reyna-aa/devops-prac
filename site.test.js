const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");

test("index.html references files that exist", () => {
  const html = fs.readFileSync("index.html", "utf8");
  for (const [, file] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    assert.ok(fs.existsSync(file), `${file} missing`);
  }
});
