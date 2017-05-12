/* global chai describe it expect mocha func */
mocha.checkLeaks()

const func = () => true

describe('ch1-q1-isUnique: ', function() {
  [
    'abcdefghia',
    'jklpoiuqwerzxcvmnsadf',
    '1234567890',
    'AaBbCcDdeFg1234567890(*&^%$#@!)'
  ].forEach(arg => {
    it(`returns true for unique string: '${arg}'`, function() {
      chai.assert.deepEqual(func(arg), true)
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
      chai.assert.deepEqual(func(arg), false)
    })
  })
})
