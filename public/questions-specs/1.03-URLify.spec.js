/* global chai describe it expect mocha urlify */

describe('Strings & Arrays - URLify', function() {
  it('Your function failed with null or undefined as an input.',
    function() {
      chai.expect(urlify(undefined)).to.be.undefined
      chai.expect(urlify(null)).to.be.null
    });

  [
    'nospaces',
    ' ',
    '   ',
    ' firstSpace',
    'lastSpace ',
    '  surroundedBySpaces  ',
    'middle  spaces',
    ' l o t s   o f   s p a c e ',
    'http://www.google.com/',
    'http://www.google.com/search?q=something really really funny'
  ].forEach(arg => {
    it('Your function failed to replace spaces with percent twenty.', function() {
      const expected = arg.replace(/ /g, '%20')
      chai.expect(urlify(arg)).to.eql(expected)
    })
  })
})
