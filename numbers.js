class NumberGroupController {
  #numberGroup;
  #numberGroupView;

  constructor(numberGroup, numberGroupView) {
    this.#numberGroup = numberGroup;
    this.#numberGroupView = numberGroupView;
  }

  start() {
    this.#numberGroup.add(1);
    this.#numberGroup.add(3);
    this.#numberGroup.add(2);

    console.log(this.#numberGroup.numbers);
    console.log(this.#numberGroup.max);
  }
}

class NumberGroupView {}

class NumberGroup {
  #numbers;

  constructor() {
    this.#numbers = [];
  }

  add(number) {
    this.#numbers.push(number);
  }

  get numbers() {
    return [...this.#numbers];
  }

  get max() {
    return this.#numbers.reduce(
      (max, number, index) => (number > max.number ? { number, index } : max),
      { number: -Infinity, index: -1 }
    );
  }
}

window.onload = () => {
  console.log("hello world");

  const numberGroup = new NumberGroup();
  const numberGroupView = new NumberGroupView();
  const numberGroupController = new NumberGroupController(
    numberGroup,
    numberGroupView
  );

  numberGroupController.start();
};
