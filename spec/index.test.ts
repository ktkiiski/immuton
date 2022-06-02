import { strictEqual } from 'assert';
import * as index from '../src/index.js';

describe('import', () => {
  const keys = Object.keys(index) as Array<keyof typeof index>;
  keys.forEach((name) => {
    it(`{${name}} from 'immuton' equals to import 'immuton/${name}'`, async () => {
      const indexImport = index[name];
      const moduleImport = await import(`../src/${name}.js`);
      strictEqual(indexImport, moduleImport.default);
    });
  });
});
