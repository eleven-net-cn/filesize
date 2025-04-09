import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { filesize } from 'filesize';
import { glob } from 'glob';
import color from 'picocolors';
import { getGzipSize } from './gzip';

export async function analyze(target: string = 'dist', {
  pattern = '*.@(js|mjs|cjs)',
} = {}): Promise<void> {
  let patternPath: string;

  const stats = await fs.stat(target).catch(() => null);
  if (stats && stats.isDirectory()) {
    patternPath = `${target}/**/${pattern}`;
  }
  else {
    patternPath = target;
  }

  console.log(color.cyan(`Using pattern: ${patternPath}`));

  const files = await glob(patternPath, { nodir: true });

  if (files.length === 0) {
    console.log(color.yellow('Not found any files'));
    return;
  }

  const filesWithSize: any[] = await Promise.all(
    files.map(async (file) => {
      const stats = await fs.stat(file);
      return {
        path: file,
        size: stats.size,
        gzip: await getGzipSize(file),
      };
    }),
  );

  filesWithSize.sort((a, b) => b.size - a.size);

  const totalSize = filesWithSize.reduce((acc, file) => acc + file.size, 0);
  const totalGzip = filesWithSize.reduce((acc, file) => acc + file.gzip, 0);

  console.log(color.bold('\n📦 File size analysis report:\n'));

  filesWithSize.forEach((file) => {
    const relativePath = path.relative(process.cwd(), file.path);
    const percentage = ((file.size / totalSize) * 100).toFixed(1);

    console.log(
      color.blue(relativePath.padEnd(50)),
      color.yellow(filesize(file.size).padEnd(15)),
      color.green(`(gzip: ${filesize(file.gzip)})`),
      color.gray(`${percentage}%`),
    );
  });

  console.log(`\n${color.bold('Total:')}`);
  console.log(color.yellow(`Raw: ${filesize(totalSize)}`));
  console.log(color.green(`Gzip: ${filesize(totalGzip)}`));
}
