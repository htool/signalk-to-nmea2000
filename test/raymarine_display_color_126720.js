const chai = require('chai')
chai.Should()

const app = {
  debug: () => {},
  error: () => {}
}

const conversion = require('../conversions/raymarineDisplayColor')(app, {})

describe('Raymarine Display Color (126720)', function () {
  const subs = conversion.conversions(conversion.testOptions)

  it('has group conversions from testOptions', function () {
    subs.should.have.length(1)
  })

  subs.forEach((subConv) => {
    subConv.tests.forEach((test, idx) => {
      it(`${subConv.keys[0]} test ${idx} matches expected n2k JSON`, function () {
        const pgns = subConv.callback(...test.input)
        pgns.should.have.length(test.expected.length)
        pgns.forEach((pgn, i) => {
          pgn.should.deep.equal(test.expected[i])
        })
      })
    })
  })

  it('maps day1 to Day 1', function () {
    subs[0].callback('day1')[0].Color.should.equal('Day 1')
  })

  it('skips unknown palette', function () {
    subs[0].callback('magenta').should.deep.equal([])
  })
})
