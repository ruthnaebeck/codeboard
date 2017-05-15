// USING REGEX

isUnique = (str) => !/(.).*\1/.test(str)


// O(N^2) TIME -- O(1) SPACE

function isUnique(str) {
  const strLength = str.length

  for (let i = 0; i < strLength; i++) {
    for (let x = i + 1; x < strLength; x++) {
      if (str[i] === str[x]) return false
    }
  }

  return true
}


// O(N) TIME -- O(N) SPACE

function isUnique(str) {
  const letterSet = new Set()

  for (const letter of str) {
    if (letterSet.has(letter)) return false
    letterSet.add(letter)
  }

  return true
}
