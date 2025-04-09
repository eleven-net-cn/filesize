import process from 'node:process';
import color from 'picocolors';
import { analyze } from '.';

const inputPath = process.argv[2] || 'dist';

console.log(color.cyan(`Analyze path: ${inputPath}`));

analyze(inputPath);
