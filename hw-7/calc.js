const MAX_INPUT_LENGTH = 18;
const NUMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const OPS = ["+", "-", "*", "/", "Enter", "Delete", "Backspace", "Escape"];

const panel = document.querySelector(".calcButtonsInner");
const display = document.getElementById("calc-display");
const topDisplay = document.getElementById("calc-display-top");
const botDisplay = document.getElementById("calc-display-bot");
const autoFocus = document.getElementById("auto-focus");

let num1;
let num2;
let lastOp;
let lastType;
let isNewInput;
let isFloat;
let msgTimeout;
let opFnMap = Object.create(null);
let opSymMap = Object.create(null);
let keyValMap = Object.create(null);

opFnMap = {
  add: (n1, n2) => n1 + n2,
  sub: (n1, n2) => n1 - n2,
  mult: (n1, n2) => n1 * n2,
  div: (n1, n2) => n1 / n2,
  sign: (n) => -n,
};

opSymMap = {
  add: "+",
  sub: "–",
  mult: "*",
  div: "÷",
  equals: "=",
};

keyValMap = {
  Enter: "equals",
  Delete: "del",
  Backspace: "del",
  Escape: "cancel",
  "+": "add",
  "-": "sub",
  "*": "mult",
  "/": "div",
};

setInitValues();

panel.addEventListener("click", onPanelClick);
document.addEventListener("keyup", onKeyUp);

function onPanelClick(evt) {
  const val = evt.target.value;
  const type = evt.target.getAttribute("type");

  autoFocus.focus();

  makeCalcInput(val, type);
}

function onKeyUp(evt) {
  const key = evt.key;
  const type = NUMS.includes(key)
    ? "num"
    : OPS.includes(key)
    ? "op"
    : undefined;
  let val;
  if (type === "num") {
    val = key;
  } else if (type === "op") {
    val = keyValMap[key];
  } else return;

  makeCalcInput(val, type);
}

function makeCalcInput(val, type) {
  if (!val || !type) return;
  try {
    if (type === "num") {
      display.value = onNumPress(val);
      return;
    }

    if (type === "op") onOpPress(val);

    return;
  } catch (err) {
    switch (err.message) {
      case "DIV_BY_ZERO": {
        showBotMsgDebounced("Division by zero not allowed. Restarting..", 2000);
        setInitValues();
        break;
      }
      default: {
        setError(err, "Oops, something went wrong. Restarting..");
        break;
      }
    }
  }
}

function onNumPress(num) {
  if (isNewInput) {
    display.value = "";
    isNewInput = isFloat = false;
  }
  if (display.value.length >= MAX_INPUT_LENGTH) {
    showBotMsgDebounced(
      `Max input length is ${MAX_INPUT_LENGTH} digits!`,
      2000
    );
    return display.value;
  }
  if (num === ".") {
    if (isFloat) return display.value;
    isFloat = true;
    return display.value ? display.value.concat(num) : "0.";
  }
  if (display.value === "0") return num;
  return display.value.concat(num);
}

function onOpPress(op) {
  switch (op) {
    case "cancel": {
      setInitValues();
      break;
    }
    case "del": {
      onDel();
      break;
    }
    case "equals": {
      if (lastOp === null) {
        updateTopDisplay(op);
        break;
      }
      onEquals();
      break;
    }
    case "sign": {
      onSign();
      break;
    }
    default: {
      if (op in opSymMap) {
        processOp();
        updateTopDisplay(op);
      }
      break;
    }
  }

  function processOp() {
    if (!isNewInput && num2 !== null) {
      num1 = Number(display.value);
      num2 = null;
      lastOp = op;
      isNewInput = true;
      return;
    }

    if (num1 === null) {
      num1 = Number(display.value);
      lastOp = op;
      isNewInput = true;
      return;
    }

    if (isNewInput) {
      lastOp = op;
      num2 = null;
      return;
    }

    display.value = num1 = calculate(num1, Number(display.value));
    lastOp = op;
    isNewInput = true;
  }

  function calculate(n1, n2) {
    if (lastOp === "div" && n2 === 0) {
      throw new Error("DIV_BY_ZERO");
    }
    let res = opFnMap[lastOp](n1, n2);
    res = Number(res.toFixed(8));
    if (!Number.isFinite(res) || res.toString().length >= MAX_INPUT_LENGTH) {
      showBotMsgDebounced("Sorry, the result is too big/small!", 3000);
      return Number(display.value);
    }
    return res;
  }

  function onEquals() {
    let res;
    if (num2 === null) {
      num2 = Number(display.value);
    } else if (!isNewInput) {
      num1 = Number(display.value);
    }
    res = calculate(num1, num2);

    display.value = res;
    updateTopDisplay("equals");
    num1 = res;
    isNewInput = true;
  }

  function onDel() {
    const len = display.value.length;

    if (display.value === "0") return;
    if (len === 1) {
      display.value = "0";
      return;
    }
    if (len === 2 && display.value[0] === "-") {
      display.value = "0";
      return;
    }

    const index = display.value.indexOf("e");
    if (~index) {
      display.value = display.value.slice(0, index);
      return;
    }
    if (display.value[len - 1] === ".") {
      isFloat = false;
    }
    display.value = display.value.slice(0, len - 1);
  }

  function onSign() {
    if (num2 !== null) {
      display.value = opFnMap.sign(Number(display.value));
      num1 = Number(display.value);
      updateTopDisplay("sign");
    } else {
      display.value = opFnMap.sign(Number(display.value));
    }
  }

  function updateTopDisplay(operation) {
    if (operation === "sign") {
      const prevNum = -num1;
      topDisplay.innerText = `negate(${prevNum})`;
      return;
    }
    if (operation === "equals") {
      topDisplay.innerText =
        lastOp === null
          ? `${Number(display.value)} =`
          : `${num1} ${opSymMap[lastOp]} ${num2} =`;
      return;
    }
    topDisplay.innerText = `${num1} ${opSymMap[lastOp]}`;
  }
}

function showBotMsgDebounced(msg, ms = 2500) {
  if (typeof msg !== "string") return;
  botDisplay.innerText = msg;
  clearTimeout(msgTimeout);
  msgTimeout = setTimeout(() => {
    botDisplay.innerText = "";
  }, ms);
}

function setInitValues() {
  num1 = null;
  num2 = null;
  lastOp = null;
  lastType = null;
  isNewInput = true;
  isFloat = false;
  display.value = "0";
  topDisplay.innerText = "";
}

function setError(err, msg) {
  console.error(err);
  showBotMsgDebounced(msg, 2000);
  setInitValues();
}
