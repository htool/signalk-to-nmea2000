const chai = require('chai')
chai.Should()

const app = {
  debug: () => {},
  error: () => {}
}

const conversion = require('../conversions/raymarineDisplayBrightness')(app, {})

describe('Raymarine Display Brightness (126720)', function () {
  const subs = conversion.conversions(conversion.testOptions)

  it('has group conversions from testOptions', function () {
    subs.should.have.length(1)
  })

  it('electrical.displays.raymarine.helm2.brightness 0.85 matches expected n2k JSON', function () {
    const test = subs[0].tests[0]
    const pgns = subs[0].callback(...test.input)
    pgns.should.deep.equal(test.expected)
  })
})
