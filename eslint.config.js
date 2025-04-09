import antfu from '@antfu/eslint-config';

export default antfu({
  type: 'lib',
  ignores: ['playground/lib'],
  rules: {
    'style/semi': [2, 'always'],
    'style/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],
    'no-console': 0,
  },
});
