/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  setupFiles: ["dotenv/config"],
};