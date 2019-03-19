/* eslint-disable no-undef,no-new */
const assert = require('assert')

const Dimension = require('../lib/dimension')
const Fact = require('../lib/fact')

// Add a single entity
describe('Test star functions', function () {
  before(() => {
  })

  describe('Bad dimensions', function () {
    it('No array', () => {
      assert.throws(() => {
        new Dimension('id', null)
      })
    })

    it('Missing key', () => {
      assert.throws(() => {
        new Dimension('id', [ { id: '1' }, { } ])
      })
    })
  })

  describe('Bad facts', function () {
    it('No array', () => {
      assert.throws(() => {
        new Fact(null)
      })
    })

    it('Incorrect dimension set', () => {
      assert.throws(() => {
        new Fact([ { id: 1 }], { foo: 'bar' })
      })
    })
  })

  describe('Searches', () => {
    const fact = new Fact([ { id1: 1, id2: 2 }, { id1: 1, id2: 3 } ], {
      id1: new Dimension('id', [ { id: 1 }, { id: 2 }, { id: 3 } ]),
      id2: new Dimension('id', [ { id: 1 }, { id: 2 }, { id: 3 } ])
    })

    it('Search retuning zero results', () => {
      const results = fact.search({
        id1: 1,
        id2: 1
      })
      assert.strictEqual(results.length, 0)
    })

    it('Search retuning one result', () => {
      const results = fact.search({
        id1: 1,
        id2: 2
      })
      assert.strictEqual(results.length, 1)
    })

    it('Search retuning all results', () => {
      const results = fact.search({
        id1: 1,
        id2: [2, 3]
      })
      assert.strictEqual(results.length, 2)
    })
  })
})
