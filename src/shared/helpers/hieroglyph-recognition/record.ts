interface Point {
  x: number
  y: number
}

// Функция для обработки массива точек и упрощения с использованием алгоритма Дугласа-Пекера
export function processDrawing(strokesData: Point[][]) {
  const simplifiedStrokes: Point[][] = [];

  strokesData.forEach((stroke) => {
    // Применяем алгоритм Дугласа-Пекера для каждого массива точек
    let simplifiedStroke = simplifyDouglasPeucker(stroke, 0.001);

    // Если количество точек больше 10, уменьшаем их до 40
    if (simplifiedStroke.length > 10) {
      simplifiedStroke = reducePointsToLimit(simplifiedStroke, 40);
    }

    simplifiedStrokes.push(simplifiedStroke);
  });

  return simplifiedStrokes;
}

// Алгоритм Дугласа-Пекера для упрощения линии
function simplifyDouglasPeucker(points: Point[], epsilon: number): Point[] {
  if (points.length <= 2) return points;

  const dmax = { value: 0, index: 0 };
  const start = points[0];
  const end = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i], start, end);
    if (d > dmax.value) {
      dmax.value = d;
      dmax.index = i;
    }
  }

  if (dmax.value > epsilon) {
    const left = simplifyDouglasPeucker(points.slice(0, dmax.index + 1), epsilon);
    const right = simplifyDouglasPeucker(points.slice(dmax.index), epsilon);

    return left.slice(0, -1).concat(right);
  } else {
    return [start, end];
  }
}

// Вычисление перпендикулярного расстояния точки от линии
function perpendicularDistance(point: Point, lineStart: Point, lineEnd: Point) {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const mag = Math.sqrt(dx * dx + dy * dy);
  if (mag === 0) return 0;

  const u = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (mag * mag);
  const ix = lineStart.x + u * dx;
  const iy = lineStart.y + u * dy;
  return Math.sqrt(Math.pow(point.x - ix, 2) + Math.pow(point.y - iy, 2));
}

// Функция для сокращения точек до заданного лимита
function reducePointsToLimit(points: Point[], limit: number) {
  const reduced = [];
  const step = (points.length - 1) / (limit - 1); // Рассчитываем шаг между точками
  for (let i = 0; i < limit; i++) {
    reduced.push(points[Math.round(i * step)]);
  }
  return reduced;
}
