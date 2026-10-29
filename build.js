const fs = require("fs");

fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist");
for (const f of ["index.html", "script.js", "style.css"]) fs.copyFileSync(f, `dist/${f}`);
