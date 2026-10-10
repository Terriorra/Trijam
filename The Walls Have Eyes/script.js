function createRandColor() {
  const randomRed = Math.floor(Math.random() * 255);
  const randomGreen = Math.floor(Math.random() * 255);
  const randomBlue = Math.floor(Math.random() * 255);

  const randomColor =
    "#" +
    randomRed.toString(16).padStart(2, "0") +
    randomGreen.toString(16).padStart(2, "0") +
    randomBlue.toString(16).padStart(2, "0");
  return randomColor;
}

function makeRandomDiff(n, diff) {
  const valRand = getRandomNum(0, 3);
  switch (valRand) {
    case 0:
      n = Math.floor(n * Math.random());
      break;
    case 1:
      n = n + Math.floor(getRandomNum(0, diff) * Math.random());
      break;
    case 2:
      n = n - Math.floor(getRandomNum(0, diff) * Math.random());
      break;
  }
  return n;
}

function createRandomStroke(fig) {
  // Длина узора

  let patternStr = "";
  for (let i = 0; i <= getRandomNum(2, 10); i += 1) {
    patternStr += " " + getRandomNum(1, 35).toString(10);
  }

  fig.setAttribute("stroke-dasharray", patternStr);

  // Форма углов
  const cornerType = ["miter", "round", "bevel"];
  fig.setAttribute("stroke-linejoin", getRandomChoice(cornerType));

  // Прозрачность
  fig.setAttribute("stroke-opacity", Math.random());

  // Задаем цвет обводки
  fig.setAttribute("stroke", createRandColor());

  // Задаем ТОЛЩИНУ обводки в пикселях (передаем как строку)
  fig.setAttribute("stroke-width", getRandomNum(3, 15).toString(10));
}

function createPattern(x, y, dx, dy, form) {
  const fig = document.createElementNS("http://www.w3.org/2000/svg", form);

  switch (form) {
    case "rect":
      fig.setAttribute("x", x);
      fig.setAttribute("y", y);
      fig.setAttribute("width", dx);
      fig.setAttribute("height", dy);
      break;
    case "circle":
      fig.setAttribute("cx", x);
      fig.setAttribute("cy", y);
      fig.setAttribute("r", getRandomChoice([dx, dy]).toString(10));
      break;
    case "ellipse":
      fig.setAttribute("cx", x);
      fig.setAttribute("cy", y);
      fig.setAttribute("rx", dx);
      fig.setAttribute("ry", dy);
      break;
    case "line":
      fig.setAttribute("x1", x); // Начало по X
      fig.setAttribute("y1", y); // Начало по Y
      fig.setAttribute("x2", x + dx); // Конец по X (смещаемся вправо)
      fig.setAttribute("y2", y + dy); // Конец по Y (смещаемся вниз)
      break;
  }

  // Красим его
  fig.setAttribute("fill", createRandColor());

  // Обводка
  createRandomStroke(fig);

  // Добавляем на холст
  canvas.appendChild(fig);
}

function createRectAbstract(x, y, dx, dy, form) {
  const fig = document.createElementNS("http://www.w3.org/2000/svg", form);

  // Настраиваем его положение и размеры
  x = makeRandomDiff(x, dx);
  y = makeRandomDiff(y, dy);

  dx = Math.abs(makeRandomDiff(dx, dx));
  dy = Math.abs(makeRandomDiff(dy, dy));

  switch (form) {
    case "rect":
      fig.setAttribute("x", x);
      fig.setAttribute("y", y);
      fig.setAttribute("width", dx);
      fig.setAttribute("height", dy);
      break;
    case "circle":
      fig.setAttribute("cx", x);
      fig.setAttribute("cy", y);
      fig.setAttribute("r", getRandomChoice([dx, dy]).toString(10));
      break;
    case "ellipse":
      fig.setAttribute("cx", x);
      fig.setAttribute("cy", y);
      fig.setAttribute("rx", dx);
      fig.setAttribute("ry", dy);
      break;
    case "line":
      fig.setAttribute("x1", x); // Начало по X
      fig.setAttribute("y1", y); // Начало по Y
      fig.setAttribute("x2", x + dx); // Конец по X (смещаемся вправо)
      fig.setAttribute("y2", y + dy); // Конец по Y (смещаемся вниз)
      break;
  }

  // Красим его
  fig.setAttribute("fill", createRandColor());

  // Обводка
  createRandomStroke(fig);

  // Добавляем на холст
  canvas.appendChild(fig);
}

function getRandomNum(start, stop) {
  const delta = stop - start;
  const length = Math.floor(Math.random() * delta);
  return length + start;
}

function getRandomChoice(arr) {
  const lenArr = arr.length;
  return arr[Math.floor(lenArr * Math.random())];
}

function createWallpaper() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Назначу шаги
  const dx = Math.floor(width / getRandomNum(3, 30));
  const dy = Math.floor(height / getRandomNum(3, 30));

  // форма паттерна
  const form = getRandomChoice(["circle", "ellipse", "rect", "line"]);
  // выбор заполнения
  // Для теста создам микро прямоугольник
  const choiceVar = getRandomNum(0, 2);

  // Цикл для заполнения
  for (let x = 0; x < width; x += dx) {
    for (let y = 0; y < height; y += dy) {
      switch (choiceVar) {
        case 0:
          createRectAbstract(x, y, dx, dy, form);
          break;
        case 1:
          createPattern(x, y, dx, dy, form);
          break;
      }
    }
  }
}

function createWall(color) {
  const wall = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  // 3. Задаем координаты начала (левый верхний угол)
  wall.setAttribute("x", "0");
  wall.setAttribute("y", "0");

  // 4. Растягиваем на 100% ширины и высоты
  wall.setAttribute("width", "100%");
  wall.setAttribute("height", "100%");

  wall.setAttribute("fill", color);
  canvas.appendChild(wall);
}

// 1. Находим наш SVG-холст по ID
const canvas = document.getElementById("game-canvas");

createWall(createRandColor());
createWallpaper();
