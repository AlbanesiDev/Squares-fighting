export interface Square {
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
  hp: number;
  damageAxis: "x" | "y";
  color: string;
  initialSpeed: number;
}

export const ARENA_SIZE = 400;
export const INITIAL_SQUARE_SIZE = 110;
export const INITIAL_HP = 100;
export const DAMAGE = 5;
export const MIN_SPEED = 3;
export const SPEED_INCREASE = 2;
export const MARGIN = 50;

export const initializeSquares = (
  playerAColor: string,
  playerBColor: string
): Square[] => {
  const generateAngle = () => {
    const angle = Math.random() * 50 + 20;
    return Math.random() < 0.5 ? angle : angle + 90;
  };

  const newSquares: Square[] = [
    {
      x: ARENA_SIZE - INITIAL_SQUARE_SIZE - MARGIN,
      y:
        Math.random() * (ARENA_SIZE - INITIAL_SQUARE_SIZE - 2 * MARGIN) +
        MARGIN,
      size: INITIAL_SQUARE_SIZE,
      dx: 0,
      dy: 0,
      hp: INITIAL_HP,
      damageAxis: "x",
      color: playerAColor,
      initialSpeed: MIN_SPEED,
    },
    {
      x: MARGIN,
      y:
        Math.random() * (ARENA_SIZE - INITIAL_SQUARE_SIZE - 2 * MARGIN) +
        MARGIN,
      size: INITIAL_SQUARE_SIZE,
      dx: 0,
      dy: 0,
      hp: INITIAL_HP,
      damageAxis: "y",
      color: playerBColor,
      initialSpeed: MIN_SPEED,
    },
  ];

  newSquares.forEach((square) => {
    const angle = generateAngle();
    square.dx =
      Math.cos((angle * Math.PI) / 180) *
      square.initialSpeed *
      (square.damageAxis === "x" ? -1 : 1);
    square.dy = Math.sin((angle * Math.PI) / 180) * square.initialSpeed;
  });

  return newSquares;
};

export const updateSquares = (
  squares: Square[]
): [Square[], "A" | "B" | null] => {
  const updatedSquares = squares.map((square) => {
    // eslint-disable-next-line prefer-const
    let { x, y, dx, dy, size } = square;

    x += dx;
    y += dy;

    if (x <= 0 || x + size >= ARENA_SIZE) {
      dx = -dx;
      x = x <= 0 ? 0 : ARENA_SIZE - size;
    }
    if (y <= 0 || y + size >= ARENA_SIZE) {
      dy = -dy;
      y = y <= 0 ? 0 : ARENA_SIZE - size;
    }

    return { ...square, x, y, dx, dy };
  });

  const [square1, square2] = updatedSquares;

  if (
    square1.x < square2.x + square2.size &&
    square1.x + square1.size > square2.x &&
    square1.y < square2.y + square2.size &&
    square1.y + square1.size > square2.y
  ) {
    const overlapX =
      Math.min(square1.x + square1.size, square2.x + square2.size) -
      Math.max(square1.x, square2.x);
    const overlapY =
      Math.min(square1.y + square1.size, square2.y + square2.size) -
      Math.max(square1.y, square2.y);
    const collisionAxis = overlapX < overlapY ? "x" : "y";

    if (collisionAxis === "x") {
      if (square1.damageAxis === "x") {
        square1.hp -= DAMAGE;
        square1.size = INITIAL_SQUARE_SIZE * (square1.hp / INITIAL_HP);
        const speedIncrease =
          ((INITIAL_HP - square1.hp) / INITIAL_HP) * SPEED_INCREASE;
        const speed = Math.sqrt(square1.dx ** 2 + square1.dy ** 2);
        square1.dx *= (speed + speedIncrease) / speed;
        square1.dy *= (speed + speedIncrease) / speed;
      }
      if (square2.damageAxis === "x") {
        square2.hp -= DAMAGE;
        square2.size = INITIAL_SQUARE_SIZE * (square2.hp / INITIAL_HP);
        const speedIncrease =
          ((INITIAL_HP - square2.hp) / INITIAL_HP) * SPEED_INCREASE;
        const speed = Math.sqrt(square2.dx ** 2 + square2.dy ** 2);
        square2.dx *= (speed + speedIncrease) / speed;
        square2.dy *= (speed + speedIncrease) / speed;
      }
    } else {
      if (square1.damageAxis === "y") {
        square1.hp -= DAMAGE;
        square1.size = INITIAL_SQUARE_SIZE * (square1.hp / INITIAL_HP);
        const speedIncrease =
          ((INITIAL_HP - square1.hp) / INITIAL_HP) * SPEED_INCREASE;
        const speed = Math.sqrt(square1.dx ** 2 + square1.dy ** 2);
        square1.dx *= (speed + speedIncrease) / speed;
        square1.dy *= (speed + speedIncrease) / speed;
      }
      if (square2.damageAxis === "y") {
        square2.hp -= DAMAGE;
        square2.size = INITIAL_SQUARE_SIZE * (square2.hp / INITIAL_HP);
        const speedIncrease =
          ((INITIAL_HP - square2.hp) / INITIAL_HP) * SPEED_INCREASE;
        const speed = Math.sqrt(square2.dx ** 2 + square2.dy ** 2);
        square2.dx *= (speed + speedIncrease) / speed;
        square2.dy *= (speed + speedIncrease) / speed;
      }
    }

    square1.dx = -square1.dx;
    square1.dy = -square1.dy;
    square2.dx = -square2.dx;
    square2.dy = -square2.dy;
  }

  if (square1.hp <= 0 || square2.hp <= 0) {
    return [updatedSquares, square1.hp <= 0 ? "B" : "A"];
  }

  return [updatedSquares, null];
};
