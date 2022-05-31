import * as index from '../src/index.js';

describe('import', () => {
  const keys = Object.keys(index) as Array<keyof typeof index>;
  keys.forEach((name) => {
    it.skip(`{${name}} from 'immuton/${name}' equals to import 'immuton/${name}'`, async () => {
      const indexImport = index[name];
      const moduleImport = await import(`../src/${name}`);
      expect(indexImport).toBe(moduleImport.default);
    });
  });
});
