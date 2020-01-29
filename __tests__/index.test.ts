import * as index from '../index';

describe('import', () => {
  const keys = Object.keys(index) as Array<keyof typeof index>;
  keys.forEach((name) => {
    it(`{${name}} from 'immuton/${name}' equals to import 'immuton/${name}'`, async () => {
      const indexImport = index[name];
      const moduleImport = await import(`../${name}`);
      expect(indexImport).toBe(moduleImport.default);
    });
  });
});
