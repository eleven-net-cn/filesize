import fs from 'node:fs/promises';

export async function getGzipSize(filePath: any): Promise<number> {
  const content = await fs.readFile(filePath);
  return new Promise((resolve) => {
    import('node:zlib').then(({ gzip }) => {
      gzip(content, (err, result) => {
        if (err)
          resolve(0);
        else resolve(result.length);
      });
    });
  });
}
