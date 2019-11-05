import Point from './point';

export default class Food {
  color: string;
  value: number;
  isKill: boolean;
  position: Point;

  constructor(color: string, value: number, isKill: boolean, position: Point) {
    this.color = color;
    this.value = value;
    this.isKill = isKill;
    this.position = position;
  }
}
