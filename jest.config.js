module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    'react-native-chart-kit': '<rootDir>/__mocks__/react-native-chart-kit.tsx',
  },
};
