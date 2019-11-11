import Snake from './snake';
import Table from './table';

export default class Game {
  point: number;
  snake: Snake;
  table: Table;
  seconds: number;
  difficulty: number;
  isOn: boolean;
  reseted: boolean;

  constructor() {
    this.point = 0;
    this.snake = null;
    this.table = null;
    this.seconds = 0;
    this.difficulty = 0;
    this.isOn = false;
    this.table = new Table(10, 10, 5, '#eeebf2');
    this.reseted = true;
  }
}
