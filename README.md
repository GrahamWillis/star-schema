[![Build Status](https://travis-ci.com/GrahamWillis/star-schema.svg?branch=master)](https://travis-ci.com/GrahamWillis/star-schema)

# star-schema
This package is can perform star-schema like operations on a set of JavaScript objects. Star schema optimization is a data-warehousing terminology.

In a star-schema a set of measurements are held in a fact table which typically contains a large volume of data. Each of the measurements will have a set of attributes assigned that can be used to filter results and aggregate data.

The star package is intended to optimize complex searches on combinations of attribute values.

Usage:

Define a number of attributes or dimensions. Each attribute value needs to be given a numeric identifier preferably from a sequence

```
const { Fact, Dimension } = require('star-search')

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
```

Define a potentially large array for example sales data

```
const salesArr = [
  { colour: 2, size: 2, style: 1, price: 45 },
  { colour: 1, size: 3, style: 2, price: 43 },
  { colour: 3, size: 2, style: 1, price: 15 },
  { colour: 3, size: 2, style: 1, price: 17 },
  { colour: 3, size: 4, style: 1, price: 19 }
]
```
Create a fact table using the array mapped to the dimensions
```
const fact = new Fact(salesArr, {
  colour: colours,
  size: sizes,
  style: styles
})
```
Apply searches to the results

```
const results = fact.search({ colour: [1, 3], style: [1, 2] })
...[![Build Status](https://travis-ci.com/GrahamWillis/star-schema.svg?branch=master)](https://travis-ci.com/GrahamWillis/star-schema)
[ { colour: 3, size: 2, style: 1, price: 15 },
  { colour: 3, size: 2, style: 1, price: 17 } ]

const value = results.reduce((a, c) => a + c.price, 0)
...
32

```



