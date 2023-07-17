class NumberGroupController {
  start() {}
}

class NumberGroupView {}

class NumberGroup {}

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
