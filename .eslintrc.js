module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // Add this rule to ignore unused variables (change to 'warn' if you prefer)
    '@typescript-eslint/no-unused-vars': 'off',
    'object-curly-spacing': ['error', 'always'],
  },
};
