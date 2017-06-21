# promise-all-recursive

> like `Promise.all()`, but for any type and recursive.

returns a promise that resolves when all promises in a recursive object-structure are resolved.

It doesn't try to do anything with rejected promises, so that is up to you.

## installation

    npm install promise-all-recursive

## usage

    const promiseAllRecursive = require('promise-all-recursive');

    const object = {
        number: 42,
        string: 'something',
        promise: Promise.resolve('this could have been from the network'),
        nested: {
          promise: Promise.resolve('...or the filesystem')
        },
        array: [
          1, 2, Promise.resolve(3)
        ],
        deepNested: [
          { anotherPromise: Promise.resolve('sure!') }
        ]
    }

    promiseAllRecursive(object)
        .then(result => console.log(result));

will print:

    {
        number: 42,
        string: 'something',
        promise: 'this could have been from the network',
        nested: {
          promise: '...or the filesystem'
        },
        array: [
          1, 2, 3
        ],
        deepNested: [
          { anotherPromise: 'sure!' }
        ]
    }

see `test/test.js` for more examples.
