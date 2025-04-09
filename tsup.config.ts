import type { Options } from 'tsup';

export default <Options>{
  entry: [
    'src/bin.ts',
    'src/index.ts',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
};
