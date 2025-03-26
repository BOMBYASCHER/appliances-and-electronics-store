export default {
  collectCoverage: true,
  coverageReporters: ['lcov'],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**'
  ],
};