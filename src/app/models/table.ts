import Field from './field';
import Point from './point';
import Food from './food';
import { FOODS } from './foodTypes';

export default class Table {
  rows: number;
  cols: number;
  fields: Field[][];
  foods: Food[];
  countOfFoods: number;
  background: string;

  constructor(rows: number, cols: number, countOfFoods: number, background: string) {
    this.rows = rows;
    this.cols = cols;
    this.background = background;
    this.fields = [];
    for (let i = 0; i < this.rows; i++) {
      const row: Field[] = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Field(this.background, new Point(i, j)));
      }
      this.fields.push(row);
    }
    this.countOfFoods = countOfFoods;
    this.foods = [];
    for (let i = 0; i < this.countOfFoods; i++) {
      const rnd = Math.floor(Math.random() * 3);
      let food: Food;
      switch (rnd) {
        case 0:
          food = { ...FOODS.normal };
          break;
        case 1:
          food = { ...FOODS.higher };
          break;
        case 2:
          food = { ...FOODS.killer };
          break;
      }
      let x = -1;
      let y = -1;
      do {
        x = Math.floor(Math.random() * this.rows);
        y = Math.floor(Math.random() * this.cols);
      } while (
        (Math.floor((this.cols - 1) / 2) <= y && Math.ceil((this.cols - 1) / 2) >= y)
      );
      food.position = new Point(x, y);
      this.fields[x][y].color = food.color;
      this.foods.push(food);
    }
  }
}
