# [filesize](https://www.npmjs.com/package/@e.fe/filesize)

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[npm-url]: https://npmjs.org/package/@e.fe/filesize
[downloads-image]: https://img.shields.io/npm/dt/@e.fe/filesize.svg
[npm-image]: https://img.shields.io/npm/v/@e.fe/filesize.svg

![](./svg.svg)

# Usage

## CLI

```zsh
npx filesize dist

# OR
# npx @e.fe/filesize dist
```

## Node API

```typescript
import { analyze } from '@e.fe/filesize';

analyze('dist');
```

### DTS

```typescript
declare function analyze(target?: string, { pattern, }?: {
  pattern?: string | undefined;
}): Promise<void>;
```
