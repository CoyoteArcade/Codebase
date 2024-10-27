module.exports = {
  extends: ['mantine', 'airbnb', 'airbnb-typescript'],
  parserOptions: {
    project: ["tsconfig.json"]
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props':[
      2,
      {
        functions: 'defaultArguments'
      }
    ],
    'import/extensions': [
      'error',
      'never',
      {
        ignorePackages: true
      }
    ],
    'no-plusplus': [
      'error', {
        allowForLoopAfterthoughts: true
      }
    ],
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 1,
    "react/jsx-props-no-spreading": [1, {
    html: "enforce",
    custom: "ignore",
    explicitSpread: "enforce",
}]
  },
};
