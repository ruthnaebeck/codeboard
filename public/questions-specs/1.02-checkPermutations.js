// O(N log N) TIME -- O(1) SPACE
function checkPermutations1(str1, str2) {
  if (!str1 || !str2 || str1.length !== str2.length) return false

  return [...str1].sort().join('') === [...str2].sort().join('')
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// 0(N) TIME -- O(N) SPACE
function checkPermutations2(str1, str2) {
  if (!str1 || !str2 || str1.length !== str2.length) return false

  const letterMap = new Map()

  for (const letter of str1) {
    letterMap.set(letter, letterMap.get(letter) + 1 || 1)
  }

  for (const letter of str2) {
    if (!letterMap.has(letter)) return false
    if (letterMap.get(letter) === 1) letterMap.delete(letter)
    else letterMap.set(letter, letterMap.get(letter) - 1)
  }

  return !letterMap.size
}
