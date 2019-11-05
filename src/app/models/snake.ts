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

  constructor() {
    this.length = 5;
    this.bodyColor = '#ffffff';
    this.headColor = '#ff0000';
    this.speed = 100;
    this.direction = Direction.UP;
    this.head = new Point(5, 5);
    this.body = [
      new Point(6, 5),
      new Point(7, 5),
      new Point(8, 5),
      new Point(9, 5)
    ];
  }
}
