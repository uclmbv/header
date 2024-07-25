/*
import dotenv from "dotenv";

dotenv.config();
*/

export default {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { scope: "breaking", release: "major" },
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "docs", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "revert", release: "patch" },
          { type: "style", release: "patch" },
          { scope: "no-release", release: false },
          { type: "test", release: false },
          { type: "build", release: false },
          { type: "ci", release: false },
          { type: "chore", release: false },
        ],
        parserOpts: { noteKeywords: ["Breaking Change", "Breaking Changes"] },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "Features", hidden: false },
            { type: "fix", section: "Bug Fixes", hidden: false },
            { type: "perf", section: "Performance", hidden: false },
            { type: "docs", section: "Docs", hidden: false },
            { type: "refactor", section: "Refactor", hidden: false },
            { type: "revert", section: "Reverts", hidden: false },
            { type: "style", section: "Styles", hidden: false },
            { type: "test", section: "Tests", hidden: true },
            {
              type: "build",
              section: "System build & External packages",
              hidden: true,
            },
            { type: "ci", section: "CI/CD", hidden: true },
            { type: "chore", section: "Chores", hidden: true },
          ],
        },
        parserOpts: { noteKeywords: ["Breaking Change", "Breaking Changes"] },
        writerOpts: {
          commitsSort: ["subject", "scope"],
        },
      },
    ],
    "@semantic-release/changelog",
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}",
      },
    ],
    ["@semantic-release/github"],
    ["@semantic-release/npm", { npmPublish: true }],
  ],
};
