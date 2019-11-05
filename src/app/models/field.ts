import Point from './point';

export default class Field {
  color: string;
  position: Point;

  constructor(color: string, point: Point) {
    this.color = color;
    this.position = point;
  }
}
