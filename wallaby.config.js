module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.ts',
      '!src/**/__tests__/*.ts',
      '!src/**/__load-tests__/*.ts',
    ],
    tests: ['src/**/__tests__/*.ts'],
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
  };
};
