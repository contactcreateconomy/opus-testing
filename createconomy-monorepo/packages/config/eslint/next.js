const baseConfig = require("./base.js");

module.exports = [
  ...baseConfig,
  {
    extends: ["next/core-web-vitals", "next/typescript"],
  },
];
