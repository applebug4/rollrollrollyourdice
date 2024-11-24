initialize();

function rollDie(diceToRoll) {
  var input = document.getElementById("userInput").value;
  console.log(input);
  var total = 0;
  var roll1 = -1;
  var roll2 = -1;
  var roll3 = -1;
  for (var i = 0; i < diceToRoll; i++) {
    if (numDice === 1) {
      total = Math.floor(Math.random() * 6) + 1;
      frequencies[total - 1] += 1;
      rolls.push(total);
    }
    if (numDice === 2) {
      roll1 = Math.floor(Math.random() * 6) + 1;
      roll2 = Math.floor(Math.random() * 6) + 1;
      total = roll1 + roll2;
      frequencies[total - 1] += 1;
      if (roll1 === roll2) {
        doublesRolled++;
      }
      rolls.push(roll1);
      rolls.push(roll2);
    }
    if (numDice === 3) {
      roll1 = Math.floor(Math.random() * 6) + 1;
      roll2 = Math.floor(Math.random() * 6) + 1;
      roll3 = Math.floor(Math.random() * 6) + 1;
      total = roll1 + roll2 + roll3;
      frequencies[total - 1] += 1;
      if (roll1 === roll2 && roll1 === roll3) {
        triplesRolled++;
      }
      rolls.push(roll1);
      rolls.push(roll2);
      rolls.push(roll3);
    }
  }
  diceRolled += diceToRoll * numDice;
  updateTable();
}

function updateTable() {
  var mean = calculateMean();
  var median = calculateMedian();
  var mode = calculateMode();
  document.getElementById("mean").textContent = "Mean: " + mean;
  document.getElementById("median").textContent = "Median: " + median;
  document.getElementById("mode").textContent = "Mode: " + mode;
  document.getElementById("totalRolls").textContent =
    "Total rolls: " + diceRolled;
  document.getElementById("numDoubles").textContent =
    "Number of doubles: " + doublesRolled;
  document.getElementById("numTriples").textContent =
    "Number of triples: " + triplesRolled;
  for (var i = 0; i < frequencies.length; i++) {
    var id = "frequency" + (i + 1);
    document.getElementById(id).textContent = frequencies[i];
  }
}

//const median = document.getElementById("Median");
//median.innerHTML = "hi";
//document.getElementById("Median").innerHTML = "hi";
//document.getElementsByClassName('Mean')[0].textContent = "hi";
//document.getElementById('totalRolls').textContent = "hi";

function calculateMean() {
  if (rolls.length === 0) {
    return 0;
  }

  var sum = 0;
  for (var i = 0; i < rolls.length; i++) {
    sum += rolls[i];
  }

  return (sum / rolls.length).toFixed(2);
}

function calculateMedian() {
  if (rolls.length === 0) {
    return 0;
  }
  var sortedRolls = rolls.slice().sort(function (elem1, elem2) {
    return elem1 - elem2;
  });

  var length = sortedRolls.length;

  if (length % 2 === 0) {
    var middle1 = sortedRolls[length / 2 - 1];
    var middle2 = sortedRolls[length / 2];
    return ((middle1 + middle2) / 2).toFixed(2);
  } else {
    var middleIndex = Math.floor(length / 2);
    return sortedRolls[middleIndex].toFixed(2);
  }
}

/*const rolls = [6, 3, 7, 8, 2, 3, 1, 3, 9, 8, 5, 6];
rolls.sort();
console.log(rolls);
console.log(calculateMedian(rolls));*/


function calculateMode() {
  if (rolls.length === 0) {
    return 0;
  }

  var maxFrequency = frequencies[0];
  var mode = 1;

  for (var i = 0; i < frequencies.length; i++) {
    if (frequencies[i] > maxFrequency) {
      maxFrequency = frequencies[i];
      mode = i + 1;
    }
  }
 
  var modes = [];
  for (var j = 0; j < frequencies.length; j++) {
    if (frequencies[j] === frequencies[mode - 1]) {
      modes.push(j + 1);
    }
  }
  
  return modes;
}

  

function display() {}

function initialize() {
  numDice = 1;
  doublesRolled = 0;
  triplesRolled = 0;
  frequencies = [];
  rolls = [];
  diceRolled = 0;

  for (var i = 0; i < 18; i++) {
    frequencies.push(0);
  }
}

function addTwo() {
  for (var i = 7; i < 13; i++) {
    var columnId = "dice" + i;
    var columnElement = document.getElementById(columnId);
    columnElement.style.display = "table-cell";
    let frequencyId = "frequency" + i;
    let frequencyElement = document.getElementById(frequencyId);
    frequencyElement.classList.remove("hide-column");
  }
  document.getElementById("dice1").style.display = "none";
  document.getElementById("frequency1").classList.add("hide-column");
}

function addThree() {
  for (var i = 13; i < 19; i++) {
    var columnId = "dice" + i;
    var columnElement = document.getElementById(columnId);
    columnElement.style.display = "table-cell";
    let frequencyId = "frequency" + i;
    let frequencyElement = document.getElementById(frequencyId);
    frequencyElement.classList.remove("hide-column");
  }
  document.getElementById("dice2").style.display = "none";
  document.getElementById("frequency2").classList.add("hide-column");
}

function removeThree() {
  for (var i = 13; i < 19; i++) {
    var columnId = "dice" + i;
    var columnElement = document.getElementById(columnId);
    columnElement.style.display = "none";
    let frequencyId = "frequency" + i;
    let frequencyElement = document.getElementById(frequencyId);
    frequencyElement.classList.add("hide-column");
  }
  document.getElementById("dice2").style.display = "table-cell";
  document.getElementById("frequency2").classList.remove("hide-column");
}

function removeTwo() {
  for (var i = 7; i < 13; i++) {
    var columnId = "dice" + i;
    var columnElement = document.getElementById(columnId);
    columnElement.style.display = "none";
    let frequencyId = "frequency" + i;
    let frequencyElement = document.getElementById(frequencyId);
    frequencyElement.classList.add("hide-column");
  }
  document.getElementById("dice1").style.display = "table-cell";
  document.getElementById("frequency1").classList.remove("hide-column");
}

function changeNumDice(num) {
  var newNumDice = numDice + num;

  if (newNumDice > 0 && newNumDice < 4) {
    numDice = newNumDice;
  }

  if (numDice == 1) {
    removeTwo();
  } else if (numDice == 2) {
    addTwo();
    removeThree();
  } else if (numDice == 3) {
    addThree();
  }

  updateTable();
  document.getElementById("numDice").textContent =
    "Number of dice being rolled: " + numDice;
}
