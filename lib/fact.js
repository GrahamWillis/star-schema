'use strict'

const Dimension = require('./dimension')

const privateMethods = {
  constructRowMask (dims, row) {
    return dims.reduce((accumulator, currentDimensionPair) => {
      const key = currentDimensionPair[0]
      const dim = currentDimensionPair[1]
      if (Array.isArray(row[key])) {
        // Make a multi entry mask
        accumulator.push(row[key].reduce((a, c) => {
          return a | dim.bitmapFromKey(c)
        }, 0))
      } else if (row[key]) {
        accumulator.push(dim.bitmapFromKey(row[key]))
      } else {
        accumulator.push(null)
      }
      return accumulator
    }, [])
  },

  constructIndexs () {
    const dims = Object.entries(this._dimensionsMap)
    this._factBitmapIndex = this._data.map((c) => {
      return { rowset: privateMethods.constructRowMask(dims, c), obj: c }
    })
  }
}

module.exports = class Fact {
  /**
   * @param data - the fact data - a set of objects containing a set of keys referencing the
   * primary key of the dimension set
   * @param dimensions - an object where each property represents the key property in the fact data
   * and the corresponding dimension objects referenced by the fact table
   */
  constructor (data, dimensionsMap) {
    if (!Array.isArray(data)) {
      throw new Error('data expected')
    }

    if (!Object.values(dimensionsMap).every(d => d instanceof Dimension)) {
      throw new Error('Dimension map error: dimension')
    }

    if (!Object.keys(dimensionsMap).every(d => typeof d === 'string')) {
      throw new Error('Dimension map error: string')
    }

    this._data = data
    this._dimensionsMap = dimensionsMap

    privateMethods.constructIndexs.call(this)
  }

  search (dimensionValues) {
    const dims = Object.entries(this._dimensionsMap)
    const rowsetMask = privateMethods.constructRowMask(dims, dimensionValues)

    const filterFunc = (r) => rowsetMask.reduce((acc, curr, idx) =>
      acc && typeof curr !== 'undefined' && (!curr || r.rowset[idx] & curr)
    , true)

    return this._factBitmapIndex.map(r => r).filter(r => filterFunc(r)).map(r => r.obj)
  }

  get data () {
    return this._data
  }

  set data (value) {
    this._data = value
  }

  get dimensionsMap () {
    return this._dimensionsMap
  }

  set dimensionsMap (value) {
    this._dimensionsMap = value
  }

  get index () {
    return this._factBitmapIndex
  }

  set index (index) {
    this._factBitmapIndex = index
  }
}
