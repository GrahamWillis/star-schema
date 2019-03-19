/**
 * This example illustrates the ability to search for a set of measurements on
 * fundamental particles with respect to their properties and classifications
 * it serves to illustrate the use of searching algorithm on an arbitrary large dataset
 *
 * For this example a large fact data set can be generated running generate-particle-data.js
 * this generates an array of measurements of size 1,000,000
 **/

/**
 * First set up the classifications and property dimensions. For each dimension object an
 * identifier needs to be assigned
 **/
const Dimension = require('../lib/dimension')
const chargeArr = require('../example/particles/properties/charge')
const spinArr = require('../example/particles/properties/spin')
const particleArr = require('../example/particles/properties/particle')
const typeArr = require('../example/particles/properties/fundamental-type')
const subtypeArr = require('../example/particles/properties/fundamental-subtype')

const dimensions = {}

console.log('Assigning dimensions')
dimensions.charge = new Dimension('id', chargeArr)
dimensions.spin = new Dimension('id', spinArr)
dimensions.particle = new Dimension('id', particleArr)
dimensions.type = new Dimension('id', typeArr)
dimensions.subtype = new Dimension('id', subtypeArr)

/**
 * Set up the fact (measurement) table. The first argument is the large measurement array
 * and the second argument is an object which maps each row of that arrary to the dimensions
 **/
const factArr = require('../example/particles/particle-fact')
const Fact = require('../lib/fact')

console.log('Creating fact table')
const fact = new Fact(factArr, {
  particleId: dimensions.particle,
  chargeId: dimensions.charge,
  fundamentalSubtype: dimensions.subtype,
  fundamentalType: dimensions.type,
  spin: dimensions.spin })

/**
 * We can now access various searches on the data as follows
 **/

// Get all measurements of fermisions spin one-half
console.log('Simple search')
let result = fact.search({
  fundamentalType: 1,
  spin: 4
})
console.log(`Found ${result.length} records`)

// Find measurements for all electron, muon and tau neutrinos
console.log('Compound search 1')
result = fact.search({
  particleId: [1, 2, 3]
})
console.log(`Found ${result.length} records`)

// All zero charge and a spin of zero or 1
console.log('Compound search 2')
result = fact.search({
  charge: 1,
  spin: [2, 6]
})
console.log(`Found ${result.length} records`)
