function concatStrings(str, sep) {
  if (typeof str !== "string") return "";
  if (typeof sep !== "string") {
    sep = "";
  }

  return inner();

  function inner() {
    return function concat(nextStr) {
      if (typeof nextStr !== "string") return str;
      str = str.concat(sep, nextStr);
      return inner();
    };
  }
}

class Calculator {
  constructor(x, y) {
    if (!isValidArg(x) || !isValidArg(y))
      throw new Error("Invalid argument(s)!");

    this.x = x;
    this.y = y;

    this.setX = (num) => {
      if (!isValidArg(num)) throw new Error("Invalid set value for X!");
      this.x = num;
    };

    this.setY = (num) => {
      if (!isValidArg(num)) throw new Error("Invalid set value for Y!");
      this.y = num;
    };

    this.logSum = () => {
      console.log(this.x + this.y);
    };

    this.logMul = () => {
      console.log(this.x * this.y);
    };

    this.logSub = () => {
      console.log(this.x - this.y);
    };

    this.logDiv = () => {
      if (this.y === 0) throw new Error("Division by zero!");
      console.log(this.x / this.y);
    };

    function isValidNum(num) {
      return (
        typeof num === "number" &&
        !Number.isNaN(num) &&
        num !== Infinity &&
        num !== -Infinity
      );
    }

    function isValidArg(arg) {
      return isValidNum(arg) && typeof arg !== "undefined";
    }
  }
}
