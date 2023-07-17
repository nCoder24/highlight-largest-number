class NumberGroupController {
  #numberGroup;
  #numberGroupView;
  #numberInputController;

  constructor(numberGroup, numberGroupView, numberInputController) {
    this.#numberGroup = numberGroup;
    this.#numberGroupView = numberGroupView;
    this.#numberInputController = numberInputController;
  }

  start() {
    this.#numberInputController.onNumber((number) => {
      this.#numberGroup.add(number);
      this.#numberGroup.sortDescending();
      this.#numberGroupView.render();
      this.#numberGroupView.highlightMax();
    });

    this.#numberInputController.readNumbers(3);
  }
}

class NumberGroupView {
  #parentContainer;
  #container;
  #numberGroup;

  constructor(title, parentContainer, numberGroup) {
    this.#parentContainer = parentContainer;
    this.#numberGroup = numberGroup;
    this.#container = this.#initialize(title);
  }

  #initialize(title) {
    const groupElement = document.createElement("div");
    groupElement.classList.add("number-group");

    const titleElement = document.createElement("h3");
    titleElement.innerText = title;

    const container = document.createElement("ul");
    container.classList.add("numbers");

    groupElement.appendChild(titleElement);
    groupElement.appendChild(container);
    this.#parentContainer.appendChild(groupElement);

    return container;
  }

  #addNumber(number) {
    const numberElement = document.createElement("li");
    numberElement.innerText = number;
    this.#container.appendChild(numberElement);
  }

  highlightMax() {
    const maxElement = this.#container.children[this.#numberGroup.max.index];
    maxElement.classList.add("max");
  }

  render() {
    [...this.#container.children].forEach((child) =>
      this.#container.removeChild(child)
    );

    this.#numberGroup.numbers.forEach((number) => this.#addNumber(number));
  }
}

class NumberGroup {
  #numbers;

  constructor() {
    this.#numbers = [];
  }

  add(number) {
    this.#numbers.push(number);
  }

  sortAscending() {
    this.#numbers.sort((a, b) => a - b);
  }

  sortDescending() {
    this.#numbers.sort((a, b) => b - a);
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

class NumberInputController {
  #callback;

  #promptNumber(onComplete) {
    setTimeout(() => {
      this.#callback(+prompt("Enter Number"));
      onComplete();
    }, 100);
  }

  onNumber(callback) {
    this.#callback = callback;
  }

  readNumbers(remaining) {
    if (remaining === 0) return;
    this.#promptNumber(() => this.readNumbers(remaining - 1));
  }
}

window.onload = () => {
  const page = document.querySelector("#page");

  const numberGroup = new NumberGroup();
  const numberGroupView = new NumberGroupView("Numbers", page, numberGroup);
  const numberInputController = new NumberInputController();
  const numberGroupController = new NumberGroupController(
    numberGroup,
    numberGroupView,
    numberInputController
  );

  numberGroupController.start();
};
