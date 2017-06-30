const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class TowersGame {
  constructor() {
    this.stack = [[1,2,3],[],[]];
    this.startIdx = 0;
    this.endIdx = 0;
    this.move = this.move.bind(this);
  }

  promptMove(cb) {
    console.log(this.stack);
    let startIdx = null;
    let endIdx = null;

    rl.question('Enter your move',function(input) {
      [startIdx, endIdx] = input.split(',');

      cb(this.move(startIdx, endIdx));
    }.bind(this));

  }

  isValid(startIdx, endIdx) {
    let startStack = this.stack[startIdx];
    let endStack = this.stack[endIdx];
    if (startStack.length === 0) {
      return false;
    }
    if (endStack.length === 0) {
      return true;
    }

    if (startStack[startStack.length - 1] > endStack[endStack.length - 1]) {
      return true;
    } else {
      return false;
    }
  }

  move(startIdx, endIdx) {
    if (this.isValid(startIdx, endIdx)) {
      let moveDisc = this.stack[startIdx].shift();
      this.stack[endIdx].push(moveDisc);
    }
  }

  isWon() {
    return this.stack[1].length === 3 || this.stack[2].length === 3;
  }

  run(completionCb) {

    this.promptMove(() => {
        if (this.isWon() === true) {
          console.log('User has won');
          completionCb();
        } else {
          this.run(completionCb);
        }

    });

  }
}

const game = new TowersGame;
// game.promptMove(game.move);
game.run(() => {console.log("Why????"); rl.close;});
