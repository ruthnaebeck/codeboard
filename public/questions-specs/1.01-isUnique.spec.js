/* global chai describe it expect mocha isUnique */
mocha.checkLeaks()

describe('Strings & Arrays - isUnique: ', function() {
  [
    'abcdefghi',
    'jklpoiuqwerzxcvmnsadf',
    '1234567890',
    'AaBbCcDdeFg1234567890(*&^%$#@!)'
  ].forEach(arg => {
    it(`returns true for unique string: '${arg}'`, function() {
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
    it(`returns false for string with dupes: '${arg}'`, function() {
      chai.assert.deepEqual(isUnique(arg), false)
    })
  })
})
