/**
 * Generate the fact data used for the mocha tests representing a population of fundamental particles
 * Source: https://en.wikipedia.org/wiki/Standard_Model#/media/File:Standard_Model_of_Elementary_Particles.svg
 */
const fs = require('fs')
const charge = require('./properties/charge')
const fundamentalSubtype = require('./properties/fundamental-subtype')
const fundamentalType = require('./properties/fundamental-type')
const particle = require('./properties/particle')
const spin = require('./properties/spin')
const Dimension = require('../../lib/dimension')

const FACT_SIZE = 1000000
const particleData = []
const dimensions = {}

dimensions.charge = new Dimension('id', charge)
dimensions.fundamentalSubtype = new Dimension('id', fundamentalSubtype)
dimensions.fundamentalType = new Dimension('id', fundamentalType)
dimensions.particle = new Dimension('id', particle)
dimensions.spin = new Dimension('id', spin)

for (let i = 0; i < FACT_SIZE; i++) {
  const p = particle[Math.round(Math.random() * (particle.length - 1))]
  const factobj = {
    particleId: p.id
  }
  switch (p.name) {
    // Leptons
    case 'electron neutrino':
      factobj.chargeId = charge.find(i => i.description === 'zero').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'lepton').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'muon neutrino':
      factobj.chargeId = charge.find(i => i.description === 'zero').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'lepton').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'tau neutrino':
      factobj.chargeId = charge.find(i => i.description === 'zero').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'lepton').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'electron':
      factobj.chargeId = charge.find(i => i.description === 'minus one').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'lepton').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'muon':
      factobj.chargeId = charge.find(i => i.description === 'minus one').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'lepton').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'tau':
      factobj.chargeId = charge.find(i => i.description === 'minus one').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'lepton').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    // Quarks
    case 'up':
      factobj.chargeId = charge.find(i => i.description === 'two thirds').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'quark').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'down':
      factobj.chargeId = charge.find(i => i.description === 'minus one third').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'quark').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'charm':
      factobj.chargeId = charge.find(i => i.description === 'two thirds').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'quark').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'strange':
      factobj.chargeId = charge.find(i => i.description === 'minus one third').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'quark').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'top':
      factobj.chargeId = charge.find(i => i.description === 'two thirds').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'quark').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    case 'bottom':
      factobj.chargeId = charge.find(i => i.description === 'minus one third').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'quark').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'fermion').id
      factobj.spin = spin.find(i => i.description === 'one half').id
      break

    // Bosons
    case 'W':
      factobj.chargeId = charge.find(i => i.description === 'plus or minus 1').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'guage boson').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'boson').id
      factobj.spin = spin.find(i => i.description === 'one').id
      break

    case 'Z':
      factobj.chargeId = charge.find(i => i.description === 'zero').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'guage boson').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'boson').id
      factobj.spin = spin.find(i => i.description === 'one').id
      break

    case 'photon \u1D6FE':
      factobj.chargeId = charge.find(i => i.description === 'zero').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'guage boson').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'boson').id
      factobj.spin = spin.find(i => i.description === 'one').id
      break

    case 'gluon':
      factobj.chargeId = charge.find(i => i.description === 'zero').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'guage boson').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'boson').id
      factobj.spin = spin.find(i => i.description === 'one').id
      break

    // Higgs
    case 'higgs':
      factobj.chargeId = charge.find(i => i.description === 'zero').id
      factobj.fundamentalSubtype = fundamentalSubtype.find(i => i.name === 'scalar boson').id
      factobj.fundamentalType = fundamentalType.find(i => i.name === 'boson').id
      factobj.spin = spin.find(i => i.description === 'zero').id
      break
  }

  // Assign some arbitrary data
  factobj.xposition = Math.random() * 100
  factobj.yposition = Math.random() * 100
  factobj.zposition = Math.random() * 100
  factobj.t = Math.random() * 1000000
  particleData.push(factobj)
}

// Write the file
fs.writeFileSync('example/particles/particle-fact.json', JSON.stringify(particleData, null, 2))
