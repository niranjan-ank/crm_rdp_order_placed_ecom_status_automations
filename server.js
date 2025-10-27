const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const PORT = 4000;

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Run Playwright tests
app.get("/run-tests", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<pre>⏳ Running Playwright tests...\n</pre>");

  // ✅ Run the specific test file
  const testProcess = spawn("npx", ["playwright", "test", "tests/index.spec.js"], {
    cwd: __dirname,
    shell: true
  });

  testProcess.stdout.on("data", (data) => {
    res.write(`<pre>${data}</pre>`);
  });

  testProcess.stderr.on("data", (data) => {
    res.write(`<pre style="color:red">${data}</pre>`);
  });

  testProcess.on("close", (code) => {
    res.write(`<pre>✅ Test process finished with code ${code}</pre>`);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Open http://localhost:${PORT} in your browser`);
});
