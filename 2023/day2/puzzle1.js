const fs = require("fs");
const { start } = require("repl");

function possibleGames(input) {
  const allGames = [];
  // object of game with properties id, reveal1, reveal2...
  // object of reveal with properties redCubes, blueCubes, greenCubes

  function extractGames(input) {
    return input.split('\n');
  }

  function extractResults(games) {
    // split the array of games to array of game objects;
    games.forEach((game) => {
      // split game string to game id string and results string
      const gameArr = game.split(":");
      const gameId = Number(gameArr[0].split("").filter(str => !isNaN(str)).join(""));
      const resultsAsStr = gameArr[1].split(";");
      const resultObjects = [];
      resultsAsStr.forEach((pullStr, index) => {
        const round = index + 1;
        let redCubes = 0;
        let blueCubes = 0;
        let greenCubes = 0;
        if (pullStr.indexOf("red") !== -1) {redCubes = parseInt(pullStr.match(`(\\d+)\\s(?=red)`))};
        if (pullStr.indexOf("blue") !== -1) {blueCubes = parseInt(pullStr.match(`(\\d+)\\s(?=blue)`))};
        if (pullStr.indexOf("green") !== -1) {greenCubes = parseInt(pullStr.match(`(\\d+)\\s(?=green)`))};
        const result = {
          round: round,
          red: redCubes,
          blue: blueCubes,
          green: greenCubes,
        };
        resultObjects.push(result);
      });
      const thisGame = { id: gameId };
      resultObjects.forEach((result, idx) => thisGame[`result${idx + 1}`] = result);
      allGames.push(thisGame);
    })
  }
  const interim = extractGames(input);
  extractResults(interim);
  function validateGame(game) {
    let possible = true;
    for (const key in game) {
      if (key.startsWith("result")) {
        const res = game[key]
        possible = possible && (res.red < 13) && (res.blue < 15) && (res.green < 14);
      }
    }
    return possible;
  }

  function minimumPower(game) {
    let minRed = 0;
    let minBlue = 0;
    let minGreen = 0;
    for (const key in game) {
      if (key.startsWith("result")) {
        const res = game[key];
        minRed = Math.max(minRed, res.red);
        minBlue = Math.max(minBlue, res.blue);
        minGreen = Math.max(minGreen, res.green);
      }
    }
    return minRed * minBlue * minGreen;
  }

  return allGames.reduce((acc, curr) => acc + minimumPower(curr), 0);
}

const input = fs.readFileSync("input.txt").toString();

console.log(possibleGames(input));