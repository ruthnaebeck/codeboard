function urlify(str) {
  return str ? str.split` `.join`%20` : str
}

function urlify(str) {
  return str ? str.replace(/\s/g, '%20') : str
}

// ADDITIONAL SOLUTION with string length
// function urlify(str, trueLength) {
//   let newString = '';
//   for (var i = 0; i < trueLength; i++) {
//     if (str[i] === ' ') newString += '%20';
//     else newString += str[i];
//   }
//   return newString;
// }
