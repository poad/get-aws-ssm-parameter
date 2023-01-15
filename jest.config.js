module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest"
    ]
  },
  verbose: true
}