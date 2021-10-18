export class Car {
  #brand = "Subaru";
  #model = "Impreza";
  #yearOfManufacturing = 2005;
  #maxSpeed = 255;
  #maxFuelVolume = 20;
  #fuelConsumption = 10;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get brand() {
    return this.#brand;
  }

  set brand(brand) {
    if (!this.#isStrInRange(brand, 1, 50))
      throw new Error("Должно быть строкой от 1 до 50 символов включительно");
    this.#brand = brand;
  }

  get model() {
    return this.#model;
  }

  set model(model) {
    if (!this.#isStrInRange(model, 1, 50))
      throw new Error("Должно быть строкой от 1 до 50 символов включительно");
    this.#model = model;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(year) {
    const curYear = new Date().getFullYear();
    if (!this.#isNumInRange(year, 1900, curYear))
      throw new Error(
        "Должно быть число от 1900 до текущего года включительно"
      );
    this.#yearOfManufacturing = year;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(speed) {
    if (!this.#isNumInRange(speed, 100, 300))
      throw new Error("Должно быть число от 100 до 300");
    this.#maxSpeed = speed;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(vol) {
    if (!this.#isNumInRange(vol, 5, 20))
      throw new Error("Должно быть число от 5 до 20");
    this.#maxFuelVolume = vol;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(fuelCons) {
    if (!this.#isPositiveNum(fuelCons))
      throw new Error("Должно быть положительным числом");
    this.#fuelConsumption = fuelCons;
  }

  start() {
    if (this.#isStarted) throw new Error("Машина уже заведена");
    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) throw new Error("Машина ещё не заведена");
    this.#isStarted = false;
  }

  fillUpGasTank(vol) {
    if (!this.#isPositiveNum(vol))
      throw new Error("Неверное количество топлива для заправки");
    if (this.#currentFuelVolume + vol > this.#maxFuelVolume)
      throw new Error("Топливный бак переполнен");

    this.#currentFuelVolume += vol;
  }

  drive(spd, hrs) {
    if (!this.#isPositiveNum(spd)) throw new Error("Неверная скорость");
    if (!this.#isPositiveNum(hrs)) throw new Error("Неверное количество часов");
    if (spd > this.#maxSpeed)
      throw new Error("Машина не может ехать так быстро");
    if (!this.#isStarted)
      throw new Error("Машина должна быть заведена, чтобы ехать");

    const distance = spd * hrs;
    const requiredFuel = (this.#fuelConsumption * distance) / 100;

    if (requiredFuel > this.#currentFuelVolume)
      throw new Error("Недостаточно топлива");

    this.#currentFuelVolume -= requiredFuel;
    this.#mileage += distance;
  }

  #isPositiveNum(vol) {
    return (
      typeof vol === "number" &&
      vol > 0 &&
      !Number.isNaN(vol) &&
      vol !== Infinity &&
      vol !== -Infinity
    );
  }

  #isStrInRange(str, from, to) {
    return (
      typeof str === "string" &&
      typeof from === "number" &&
      typeof to === "number" &&
      str.length >= from &&
      str.length <= to
    );
  }

  #isNumInRange(num, from, to) {
    return (
      typeof num === "number" &&
      typeof from === "number" &&
      typeof to === "number" &&
      num >= from &&
      num <= to
    );
  }
}
