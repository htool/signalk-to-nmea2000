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

  it('skips unknown night mode color', function () {
    const colorConv = subs.find(s => s.keys[0].endsWith('nightModeColor'))
    colorConv.callback('unknown').should.deep.equal([])
  })

  it('maps day nightMode.state 0 to Value 2', function () {
    const nightConv = subs.find(s => s.keys[0].endsWith('nightMode.state'))
    nightConv.callback(0)[0].Value.should.equal(2)
  })
})
