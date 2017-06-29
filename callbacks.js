class Clock {
  constructor() {
    let date = new Date();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
    this.printTime();
    let boundTick = this._tick.bind(this);
    setInterval(boundTick, 1000);
  }

  printTime() {
    console.log(`${this.hour}:${this.minute}:${this.second}`);
  }

  _tick() {
    this.second++;
    if (this.second === 60) {
      this.minute ++;
      this.second = 0;
    }
    if (this.minute === 60) {
      this.hour ++;
      this.minute = 0;
    }
    if (this.hour === 24) {
      this.hour = 0;
    }
      this.printTime();
  }
}

// const clock = new Clock();

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    rl.question("Enter a number!", function(number){
      let increment = parseInt(number);
      sum += increment;
      console.log(sum);
      return addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    rl.close();
    return completionCallback(sum);
  }
}
// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
  rl.question(`Is ${el1} greater than ${el2}?`, function(response) {
    if (response === "yes") {
      callback(true);
    } else if (response === "no") {
      callback(false);
    }

  });
}
// askIfGreaterThan("ruby", "javascript", (bool)=> {console.log(bool);});

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop){
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i+1], function(isGreaterThan) {
      if (isGreaterThan === true) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      }
        return innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else if (i === (arr.length - 1)) {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

// innerBubbleSortLoop([2,2,3,5,1], 0, false, () => {console.log("In outer bubble sort");});

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps === true) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}
//
// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   rl.close();
// });


Function.prototype.myBind = function (context) {
  // this.apply(context);
  return (...args) => {this.apply(context, args);};
};
//
// class Lamp {
//   constructor() {
//     this.name = "a lamp";
//   }
// }
//
// const turnOn = function() {
//    console.log("Turning on " + this.name);
// };
//
// const lamp = new Lamp();
//
// // turnOn(); // should not work the way we want it to
//
// // const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);
//
// // boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"
