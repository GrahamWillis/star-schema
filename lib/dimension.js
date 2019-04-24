'use strict'

const privateMethods = {
  constructIndexs () {
    this._primaryKeyIndex = new Map(this._data.map((c) => { return [ c[this._keyProperty], c ] }))
    this._bitmapIndex = new Map(this._data.map((c, i) => { return [ Math.pow(2, i), c[this._keyProperty] ] }))
    this._reverseBitmapIndex = new Map(this._data.map((c, i) => { return [ c[this._keyProperty], Math.pow(2, i) ] }))
  }
}

module.exports = class Dimension {
  /**
   * @param keyProperty - the primary key property found in each element of the data
   * @param data - an data of objects where at least the primary key appears in each object
   */
  constructor (keyProperty, data) {
    if (!Array.isArray(data)) {
      throw new Error('data expected: ' + JSON.stringify(data))
    }

    if (!data.every(e => e[keyProperty])) {
      throw new Error('Expected key: ' + JSON.stringify(data))
    }

    const ids = data.map(d => d[keyProperty])
    for (let i = 1; i <= data.length; i++) {
      if (ids[i - 1] !== i) {
        throw new Error('Dimension identifiers must be contiguous starting at 1')
      }
    }

    this._keyProperty = keyProperty
    this._data = data
    privateMethods.constructIndexs.call(this)
  }

  bitmapFromKey (key) {
    return this._reverseBitmapIndex.get(key)
  }

  get pkindex () {
    return this._primaryKeyIndex
  }
}
