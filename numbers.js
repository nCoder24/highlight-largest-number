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
    this.#numberGroupView.render(this.#numberGroup);

    console.log(this.#numberGroup.numbers);
    console.log(this.#numberGroup.max);
  }
}

class NumberGroupView {
  #parentContainer;
  #container;

  constructor(title, parentContainer) {
    this.#parentContainer = parentContainer;
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

  render(numberGroup) {
    [...this.#container.children].forEach((child) =>
      this.#container.removeChild(child)
    );

    numberGroup.numbers.forEach((number) => this.#addNumber(number));
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
  const page = document.querySelector("#page");

  const numberGroup = new NumberGroup();
  const numberGroupView = new NumberGroupView("Numbers", page);
  const numberGroupController = new NumberGroupController(
    numberGroup,
    numberGroupView
  );

  numberGroupController.start();
};
