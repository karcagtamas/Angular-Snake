import Point from './point';
import { Direction } from './directions';

export default class Snake {
  length: number;
  bodyColor: string;
  headColor: string;
  speed: number;
  direction: Direction;
  head: Point;
  body: Point[];

  constructor(headX: number, headY: number, headColor: string, bodyColor: string) {
    this.length = 5;
    this.bodyColor = bodyColor;
    this.headColor = headColor;
    this.speed = 100;
    this.direction = Direction.UP;
    this.head = new Point(headX, headY);
    this.body = [
      new Point(headX + 1, headY),
      new Point(headX + 2, headY),
      new Point(headX + 3, headY),
      new Point(headX + 4, headY)
    ];
  }
}
