/* global chai describe it expect mocha isUnique */
mocha.checkLeaks()

describe('Strings & Arrays - isUnique: ', function() {
  [
    'abcdefghi',
    'jklpoiuqwerzxcvmnsadf',
    '1234567890',
    'AaBbCcDdeFg1234567890(*&^%$#@!)'
  ].forEach(arg => {
    it('Your function failed to return true for a unique string',
      function() {
        chai.assert.deepEqual(isUnique(arg), true)
      })
  });

  [
    'abcadef',
    'aaaaaaaaaa',
    'abcdefghijklmnopqrstuvwxyza',
    '1234567890asdklf1',
    '!@#$%^&*()(*#($&#(*$&#*($&#()))))'
  ].forEach(arg => {
    it('Your function failed to return false for a string with duplicates',
      function() {
        chai.assert.deepEqual(isUnique(arg), false)
      })
  })
})
