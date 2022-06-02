import { strictEqual } from 'assert';
import includes from '../src/includes.js';

describe('includes()', () => {
  it('returns true if array contains null', () => {
    strictEqual(includes(['foo', null, 1], null), true);
  });
  it('returns true if array does not contain null', () => {
    strictEqual(includes(['foo', undefined, 1], null), false);
  });
  it('returns true if array contains undefined', () => {
    strictEqual(includes(['foo', undefined, 1], undefined), true);
  });
  it('returns true if array does not contain undefined', () => {
    strictEqual(includes(['foo', null, 1], undefined), false);
  });
  it('returns true if array contains string', () => {
    strictEqual(includes(['foo', undefined, 1], 'foo'), true);
  });
  it('returns true if array does not contain string', () => {
    strictEqual(includes(['bar', 'foobar', 1], 'foo'), false);
  });
  it('returns true if array contains number', () => {
    strictEqual(includes(['foo', undefined, 1], 1), true);
  });
  it('returns true if array does not contain number', () => {
    strictEqual(includes(['bar', 'foobar', 1, 3], 0), false);
  });
  it('returns true if array contains boolean', () => {
    strictEqual(includes(['foo', true, 1], true), true);
  });
  it('returns true if array does not contain boolean', () => {
    strictEqual(includes(['foo', true, 1, 3], false), false);
  });
  it('returns true if array contains date object', () => {
    strictEqual(includes(['foo', new Date(1), 1], new Date(1)), true);
  });
  it('returns true if array does not contain date object', () => {
    strictEqual(includes(['foo', new Date(2), 1, 3], new Date(1)), false);
  });
  it('returns true if array contains equal object', () => {
    strictEqual(includes(['foo', { a: 'A', b: 'B' }, 1], { a: 'A', b: 'B' }), true);
  });
  it('returns true if array does not contain equal object', () => {
    strictEqual(includes(['foo', { a: 'A' }, 1, 3], { a: 'A', b: 'B' }), false);
  });
});
