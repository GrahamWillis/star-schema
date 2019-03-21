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
const Dimension = require('../../lib/dimension')
const chargeArr = require('./properties/charge')
const spinArr = require('./properties/spin')
const particleArr = require('./properties/particle')
const typeArr = require('./properties/fundamental-type')
const subtypeArr = require('./properties/fundamental-subtype')

const dimensions = {}

dimensions.charge = new Dimension('id', chargeArr)
dimensions.spin = new Dimension('id', spinArr)
dimensions.particle = new Dimension('id', particleArr)
dimensions.type = new Dimension('id', typeArr)
dimensions.subtype = new Dimension('id', subtypeArr)

const runWithTimer = (fnc, t) => {
  const hrstart = process.hrtime()
  fnc()
  const hrend = process.hrtime(hrstart)
  console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000)
}

/**
 * Set up the fact (measurement) table. The first argument is the large measurement array
 * and the second argument is an object which maps each row of that array to the dimensions
 **/

let factArr
let Fact

console.log('\nReading data from disk...')
runWithTimer(() => {
  factArr = require('./particle-fact')
  Fact = require('../../lib/fact')
})

console.log('\nCreating fact table...')
let fact
runWithTimer(() => {
  fact = new Fact(factArr, {
    particleId: dimensions.particle,
    chargeId: dimensions.charge,
    fundamentalSubtype: dimensions.subtype,
    fundamentalType: dimensions.type,
    spin: dimensions.spin
  })
  console.log(`Created ${fact.index.length} records`)
})
/**
 * We can now access various searches on the data as follows
 **/

// Get all measurements of fermions spin one-half
console.log('\nsearch: fermions spin one-half')
runWithTimer(() => {
  let result = fact.search({
    fundamentalType: 1,
    spin: 4
  })
  console.log(`Found ${result.length} records`)
})

// Find measurements for all electron, muon and tau neutrinos
console.log('\nsearch: electron, muon and tau neutrinos')
runWithTimer(() => {
  let result = fact.search({
    particleId: [1, 2, 3]
  })
  console.log(`Found ${result.length} records`)
})

// All zero charge and a spin of zero or 1
console.log('\nsearch: zero charge and a spin of zero or 1')
runWithTimer(() => {
  let result = fact.search({
    charge: 1,
    spin: [2, 6]
  })
  console.log(`Found ${result.length} records`)
})

// Example: Calculate the average displacement of all electrons from the origin
console.log('\nevaluate: average displacement of all electrons from the origin')
runWithTimer(() => {
  const av = (r) => r.reduce((a, c) =>
    Math.pow(Math.pow(c.xposition, 2) + Math.pow(c.yposition, 2) + Math.pow(c.zposition, 2), 0.5) + a, 0) / r.length

  let result = fact.search({
    particle: 4
  })

  console.log(`Average displacement of electrons = ${av(result)}`)
})
