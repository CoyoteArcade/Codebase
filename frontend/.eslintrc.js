module.exports = {
  extends: ['mantine', 'airbnb', 'airbnb-typescript'],
  parserOptions: {},
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
