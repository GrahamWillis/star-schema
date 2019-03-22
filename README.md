[![Build Status](https://travis-ci.com/GrahamWillis/star-schema.svg?branch=master)](https://travis-ci.com/GrahamWillis/star-schema)
# star-schema
This package can perform star-schema like operations on a set of JavaScript objects. Star schema optimisation is a data warehousing terminology where a set of measurements are held in a fact table which typically contains a large volume of data. Each of the measurements will have a set of attributes that can be used to filter results and aggregate data. The attributes are held in dimension tables which each have a one-to-many relationship to the fact table. The set of relationship values for any given entry in the fact table is stored as a bitmap index enabling complex searches on combinations of attribute values to be performed with a single scan of the index.

## Usage
### Dimensions
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
### Facts
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
### Searches
Apply searches to the results
```
const results = fact.search({ colour: [1, 3], style: [1, 2] })
[ { colour: 3, size: 2, style: 1, price: 15 },
  { colour: 3, size: 2, style: 1, price: 17 } ]
const value = results.reduce((a, c) => a + c.price, 0)
...
32
```
See examples for further information. 

**Caution**
Take care when running these algorithms in single-threaded, asynchronous context such as a Node.js web server. In such scenarios it would be preferable to prepare the index on the server and have the browser request the index for repeated searches. The `Fact.index` getters and setters may be used for this.