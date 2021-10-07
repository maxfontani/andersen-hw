Array.prototype.myFilter = function myFilter(cb, context) {
  if (typeof cb !== "function")
    throw new Error("The first argument must be a function!");

  if (!isValidContext(context))
    throw new Error(
      "The optional second argument must be a context object or undefined!"
    );

  cb = cb.bind(context);

  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) result.push(this[i]);
  }

  return result;

  function isValidContext(context) {
    return (
      typeof context === "undefined" ||
      (typeof context === "object" &&
        typeof context !== "function" &&
        context !== null &&
        !Array.isArray(context))
    );
  }
};

function createDebounceFunction(fn, ms) {
  let timeout;
  return function debouncedFn() {
    const fnCall = () => {
      fn.apply(null, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}
