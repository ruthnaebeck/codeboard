/* global chai describe it expect mocha palindromePermutation */

describe('Strings & Arrays - Palindrome Permutation', function() {
  it('Your function failed with null or undefined as an input.',
    function() {
      chai.expect(palindromePermutation(undefined)).to.be.false
      chai.expect(palindromePermutation(null)).to.be.false
    });

  [
    ' ',
    '   ',
    'aabb',
    'ab a b',
    ' a b a b ',
    'sasadfgsadfghjk;hjk;sadfghjk;dfghjk;',
    'sa sadfgsadfgh jk;hjkz;sadfg hjk;dfghjk;',
    'aabb c'
  ].forEach(arg => {
    it('Your function failed to return true for a palindromic string',
      function() {
        chai.expect(palindromePermutation(arg)).to.be.true
      })
  });

  [
    'abcadef',
    '1234567890',
    'a b',
    'aabbcd'
  ].forEach(arg => {
    it('Your function failed to return false for a non palindromic string', function() {
      chai.expect(palindromePermutation(arg)).to.be.false
    })
  })
})
