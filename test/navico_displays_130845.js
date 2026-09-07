const chai = require('chai')
chai.Should()

const app = {
  debug: () => {},
  error: () => {}
}

const conversion = require('../conversions/navicoDisplays')(app, {})

describe('Navico / B&G Display (130845)', function () {
  it('has group conversions from testOptions', function () {
    const subs = conversion.conversions(conversion.testOptions)
    subs.should.have.length(3)
  })

  const subs = conversion.conversions(conversion.testOptions)

  it('skips unknown night mode color', function () {
    const colorConv = subs.find(s => s.keys[0].endsWith('nightModeColor'))
    colorConv.callback('unknown').should.deep.equal([])
    colorConv.callback('magenta').should.deep.equal([])
  })

  it('maps day nightMode.state 0 to Value 1', function () {
    const nightConv = subs.find(s => s.keys[0].endsWith('nightMode.state'))
    nightConv.callback(0)[0].Value.should.equal(1)
  })
})
