const { Fact, Dimension } = require('../../index')

const colours = new Dimension('id', [
  { id: 1, name: 'Red' },
  { id: 2, name: 'White' },
  { id: 3, name: 'Blue' }
])

const sizes = new Dimension('id', [
  { id: 1, name: 'Small' },
  { id: 2, name: 'Medium' },
  { id: 3, name: 'Large' }
])

const styles = new Dimension('id', [
  { id: 1, name: "Men's" },
  { id: 2, name: "Women's" }
])

const salesArr = [
  { colour: 2, size: 2, style: 1, price: 45 },
  { colour: 1, size: 3, style: 2, price: 43 },
  { colour: 3, size: 2, style: 1, price: 15 },
  { colour: 3, size: 2, style: 1, price: 17 },
  { colour: 3, size: 4, style: 1, price: 19 }
]

const fact = new Fact(salesArr, {
  colour: colours,
  size: sizes,
  style: styles
})

const results = fact.search({ colour: [1, 3], size: [2, 4] })
console.log(results)

const value = results.reduce((a, c) => a + c.price, 0)
console.log('Total value ' + value)