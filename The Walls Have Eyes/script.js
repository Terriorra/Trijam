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
