const { execFileSync } = require("node:child_process");

module.exports = {
  gitLastCommit: (data) => {
    const file = data.page?.inputPath;
    if (!file) return null;
    try {
      const out = execFileSync(
        "git",
        ["log", "-1", "--format=%cI", "--", file],
        { encoding: "utf8" },
      ).trim();
      if (!out) console.warn(`[gitLastCommit] no commits found for ${file}`);
      return out || null;
    } catch (e) {
      console.warn(`[gitLastCommit] git failed for ${file}: ${e.message}`);
      return null;
    }
  },
};
