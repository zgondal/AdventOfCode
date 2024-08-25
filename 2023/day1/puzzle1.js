const fs = require('fs');

function calibration(str) {
  // Part 2:
  let input = replaceNumbersInOrder(str);
  // split string into new lines
  const lines = input.split("\n")
  // console.log(lines.slice(410, 420));
  // filter all non-numeric characters from each line
  const numericalStrings = lines.map(line => line.split("").filter(char => !isNaN(char)).join(""))
  const digits = numericalStrings.map(num => Number(num));
  // get the first and last digits
  const calibrationValues = digits.map(number => {
    if (parseInt(number) <= 99 && parseInt(number) > 9) {
      return Number(number);
    } else if (parseInt(number) < 10) {
      return Number(number) * 10 + Number(number);
    } else {
      return Number(number.toString()[0]) * 10 + Number(number.toString().slice(-1));
    }
  });
  // sum all calibration values
  console.log(digits[151]);
  console.log(calibrationValues[151])
  return calibrationValues.reduce((sum, curr) => sum + curr, 0);
}

const input = fs.readFileSync("input.txt").toString();

const ans = calibration(input);
console.log(ans);

function replaceNumbersInOrder(text) {
  const numberWords = [
    'zero', 'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 
    'twelve', 'thirteen', 'fourteen', 'fifteen', 
    'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];

  // Create a regex pattern that matches any of the number words
  const pattern = new RegExp(numberWords.join('|'), 'g');

  let result = '';
  let lastIndex = 0;

  // Find all matches
  let match;
  while ((match = pattern.exec(text)) !== null) {
    // Add the text before the match
    result += text.slice(lastIndex, match.index);

    // Add the numerical equivalent of the match
    result += numberWords.indexOf(match[0]);

    // Update lastIndex, but don't move past the last character of the match
    // This allows us to catch overlapping matches
    lastIndex = pattern.lastIndex - 1;
    pattern.lastIndex = lastIndex;
  }

  // Add any remaining text after the last match
  result += text.slice(lastIndex);

  return result;
}

