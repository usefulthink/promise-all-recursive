require('mocha');

const promiseAllRecursive = require('../index');
const expect = require('unexpected');

describe('promiseAllRecursive()', () => {
  it('wraps primitives in promises', () => {
    return Promise.all([
      expect(promiseAllRecursive(42), 'to be fulfilled with', 42),
      expect(promiseAllRecursive('hello'), 'to be fulfilled with', 'hello')
    ]);
  });

  it('handles plain arrays', () => {
    expect(promiseAllRecursive([1, 2, 3]), 'to be fulfilled with', [1, 2, 3]);
  });

  it('handles plain objects', () => {
    expect(promiseAllRecursive({ a: 1, b: 2 }), 'to be fulfilled with', {
      a: 1,
      b: 2
    });
  });

  it('handles promises', () => {
    expect(
      promiseAllRecursive(Promise.resolve('resolved')),
      'to be fulfilled with',
      'resolved'
    );
  });

  it('handles arrays of promises', () => {
    expect(
      promiseAllRecursive([Promise.resolve(1), Promise.resolve(2)]),
      'to be fulfilled with',
      [1, 2]
    );
  });

  it('handles mixed arrays', () => {
    expect(
      promiseAllRecursive([Promise.resolve(1), 2, Promise.resolve(3)]),
      'to be fulfilled with',
      [1, 2, 3]
    );
  });

  it('handles flat objects with promises', () => {
    const actual = promiseAllRecursive({
      a: Promise.resolve(1),
      b: Promise.resolve(2),
      c: 3
    });
    const expected = { a: 1, b: 2, c: 3 };

    expect(actual, 'to be fulfilled with', expected);
  });

  it('handles nested objects with promises', () => {
    const actual = promiseAllRecursive({
      nested: {
        a: Promise.resolve(1)
      },
      b: Promise.resolve(2),
      c: 3
    });
    const expected = { nested: { a: 1 }, b: 2, c: 3 };

    expect(actual, 'to be fulfilled with', expected);
  });

  it('handles nested arrays with promises', () => {
    const actual = promiseAllRecursive({
      nested: [Promise.resolve(1), 2],
      b: Promise.resolve(2),
      c: 3
    });
    const expected = { nested: [1, 2], b: 2, c: 3 };

    expect(actual, 'to be fulfilled with', expected);
  });

  it('handles deep nested promises', () => {
    const actual = promiseAllRecursive({
      a: 1,
      nested: [{ b: [Promise.resolve(42)] }]
    });
    const expected = { a: 1, nested: [{ b: [42] }] };

    expect(actual, 'to be fulfilled with', expected);
  });
});
