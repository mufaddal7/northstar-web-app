const { spawn } = require("node:child_process");
const path = require("node:path");

const nextCli = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);
const child = spawn(process.execPath, [nextCli, ...process.argv.slice(2)], {
  env: { ...process.env, NODE_USE_SYSTEM_CA: "1" },
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("error", (error) => {
  console.error("Could not start Next.js:", error);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  process.exitCode =
    code ?? (signal === "SIGINT" ? 130 : signal === "SIGTERM" ? 143 : 1);
});
