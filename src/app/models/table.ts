import Field from './field';
import Point from './point';

export default class Table {
  rows: number;
  cols: number;
  fields: Field[][];
  background: string;

  constructor() {
    this.rows = 10;
    this.cols = 10;
    this.background = '#000000';
    this.fields = [];
    for (let i = 0; i < this.rows; i++) {
      const row: Field[] = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Field(this.background, new Point(i, j)));
      }
      this.fields.push(row);
    }
  }
}
