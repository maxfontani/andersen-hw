function makeObjectDeepCopy(object) {
  if (
    typeof object !== "object" ||
    typeof object === "function" ||
    Array.isArray(object) ||
    object === null
  )
    return;

  let selfRefs = [object];

  return copyObj(object);

  function copyObj(obj) {
    let newObj = {};

    if (Array.isArray(obj)) return copyArr(obj);

    for (k of Object.keys(obj)) {
      if (typeof obj[k] === "function") continue;
      if (typeof obj[k] === "object" && obj[k] !== null) {
        if (selfRefs.includes(obj[k]))
          throw new Error("Recursive references are not allowed!");
        selfRefs.push(obj[k]);
        newObj[k] = Array.isArray(obj[k]) ? copyArr(obj[k]) : copyObj(obj[k]);
      } else {
        newObj[k] = obj[k];
      }
    }

    return newObj;
  }

  function copyArr(arr) {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
      newArr[i] = typeof arr[i] === "object" ? copyObj(arr[i]) : arr[i];
    }

    return newArr;
  }
}

function selectFromInterval(arr, num1, num2) {
  if (!Array.isArray(arr))
    throw new Error("Ошибка! Введите массив первым аргументом!");

  if (!isValidNum(num1) || !isValidNum(num2))
    throw new Error("Ошибка! Интервал содержит невалидное число!");

  const from = num1 < num2 ? num1 : num2;
  const to = from === num1 ? num2 : num1;

  let filteredArr = arr.reduce(function filterByInterval(acc, cur) {
    if (!isValidNum(cur))
      throw new Error("Ошибка! Массив содержит невалидное число!");
    if (cur >= from && cur <= to) acc.push(cur);
    return acc;
  }, []);

  return filteredArr;

  function isValidNum(num) {
    if (
      typeof num !== "number" ||
      Number.isNaN(num) ||
      num === Infinity ||
      num === -Infinity
    )
      return false;
    return true;
  }
}

const myIterable = {
  from: -42,
  to: 42,
  [Symbol.iterator]: function myIterator() {
    if (!Number.isSafeInteger(this.from) || !Number.isSafeInteger(this.to))
      throw new Error(
        "Ошибка! Диапазон должен быть задан двумя целыми числами."
      );

    if (this.to < this.from) throw new Error("Ошибка! Неверный диапазон.");

    let myIterObj = myGenerator.call(this);

    return {
      next: function nextValue() {
        return myIterObj.next();
      },
    };

    function* myGenerator() {
      let current = this.from;
      while (current <= this.to) {
        yield current;
        current++;
      }
    }
  },
};
