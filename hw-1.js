function convert() {
  let num1 = prompt("Пожалуйста, введите число:");
  let num2 = prompt("Пожалуйста, введите систему счисления:");

  if (!(num1 && num2)) {
    console.log("Некорректный ввод! Введите оба значения.");
    return;
  }

  num1 = Number(num1);
  num2 = Number(num2);

  if (!(isValidNum(num1) && isValidNum(num2))) {
    console.log("Некорректный ввод!");
  } else if (num2 < 2 || num2 > 32) {
    console.log("Некорректный ввод! Допустимые системы счисления от 2 до 32.");
  } else if (num2 !== 10) {
    console.log(num1.toString(num2));
  } else {
    console.log(parseInt(num1, 10));
  }

  return;

  function isValidNum(num) {
    if (Number.isNaN(num) || num === Infinity || num === -Infinity)
      return false;
    return true;
  }
}

function calc() {
  var count = 1;
  let num1 = promptNum();
  if (typeof num1 === "undefined") return;

  let num2 = promptNum();
  if (typeof num2 === "undefined") return;

  console.log(`Ответ: ${num1 + num2}, ${num1 / num2}.`);

  return;

  function promptNum() {
    let num = prompt(`Пожалуйста, введите ${count}-е число:`);

    if (!num) {
      console.log("Некорректный ввод! Пустые поля не принимаются.");
      return;
    }

    num = Number(num);

    if (!isValidNum(num)) {
      console.log("Некорректный ввод!");
      return;
    }

    count += 1;
    return num;
  }

  function isValidNum(num) {
    if (Number.isNaN(num) || num === Infinity || num === -Infinity)
      return false;
    return true;
  }
}
