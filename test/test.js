/* eslint-disable no-undef,no-new */
const assert = require('assert')

const Dimension = require('../lib/dimension')
const Fact = require('../lib/fact')

// Add a single entity
describe('Test star functions', function () {
  before(() => {
  })

  describe('#badDimensions', function () {
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

  describe('#badFacts', function () {
    it('No array', () => {
      assert.throws(() => {
        new Fact(null)
      })
    })

    it('Incorrect dimension set', () => {
      assert.throws(() => {
        new Fact([], { foo: 'bar' })
      })
    })
  })
})
