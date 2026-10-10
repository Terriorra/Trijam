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

createWall("#aa3c30");
