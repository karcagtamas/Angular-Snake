import { Component, OnInit, HostListener } from '@angular/core';
import Game from 'src/app/models/game';
import Snake from 'src/app/models/snake';
import { Direction } from 'src/app/models/directions';
import Food from 'src/app/models/food';
import { Error } from 'src/app/models/error';
import { FOODS } from 'src/app/models/foodTypes';
import Point from 'src/app/models/point';
import { SecondsPipe } from '../../pipes/seconds.pipe';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [SecondsPipe]
})
export class HomeComponent implements OnInit {
  game: Game = new Game();
  ms = 0;
  alert = '';
  interval;
  @HostListener('document:keypress', ['$event']) handleKeyPress(
    event: KeyboardEvent
  ) {
    switch (event.key) {
      case 'w':
        if (this.game.snake.direction !== Direction.DOWN) {
          this.game.snake.direction = Direction.UP;
        } else {
          this.stopGame(Error.BACK_COLLAPSE);
        }
        break;
      case 's':
        if (this.game.snake.direction !== Direction.UP) {
          this.game.snake.direction = Direction.DOWN;
        } else {
          this.stopGame(Error.BACK_COLLAPSE);
        }
        break;
      case 'a':
        if (this.game.snake.direction !== Direction.RIGHT) {
          this.game.snake.direction = Direction.LEFT;
        } else {
          this.stopGame(Error.BACK_COLLAPSE);
        }
        break;
      case 'd':
        if (this.game.snake.direction !== Direction.LEFT) {
          this.game.snake.direction = Direction.RIGHT;
        } else {
          this.stopGame(Error.BACK_COLLAPSE);
        }
        break;
    }
  }

  constructor() {}

  ngOnInit() {
    this.setSnake();
  }

  setSnake() {
    this.game = new Game();
    this.game.snake = new Snake();
    const snake = this.game.snake;
    this.game.table.fields[snake.head.x][snake.head.y].color = snake.headColor;
    for (const i of snake.body) {
      this.game.table.fields[i.x][i.y].color = snake.bodyColor;
    }
  }

  startGame() {
    this.game.isOn = true;
    this.game.reseted = false;
    this.interval = setInterval(() => {
      this.moveForward();
      this.ms += this.game.snake.speed;
    }, this.game.snake.speed);
  }

  resetGame() {
    clearInterval(this.interval);
    this.alert = '';
    this.game.reseted = true;
    this.setSnake();
  }

  stopGame(msg: string) {
    this.game.isOn = false;
    this.alert = msg;
    clearInterval(this.interval);
  }

  writeOut() {
    for (const i of this.game.table.fields) {
      for (const j of i) {
        j.color = this.game.table.background;
      }
    }
    for (const i of this.game.table.foods) {
      this.game.table.fields[i.position.x][i.position.y].color = i.color;
    }
    for (const i of this.game.snake.body) {
      this.game.table.fields[i.x][i.y].color = this.game.snake.bodyColor;
    }
    this.game.table.fields[this.game.snake.head.x][
      this.game.snake.head.y
    ].color = this.game.snake.headColor;
  }

  moveForward() {
    const snake = this.game.snake;
    /*     this.game.table.fields[snake.head.x][snake.head.y].color = snake.bodyColor; */
    this.game.snake.body.unshift({ ...snake.head });
    switch (this.game.snake.direction) {
      case Direction.UP:
        if (snake.head.x !== 0) {
          snake.head.x--;
        } else {
          this.stopGame(Error.BORDER_COLLAPSE);
        }
        break;

      case Direction.DOWN:
        if (snake.head.x !== this.game.table.rows - 1) {
          snake.head.x++;
        } else {
          this.stopGame(Error.BORDER_COLLAPSE);
        }
        break;

      case Direction.LEFT:
        if (snake.head.y !== 0) {
          snake.head.y--;
        } else {
          this.stopGame(Error.BORDER_COLLAPSE);
        }
        break;

      case Direction.RIGHT:
        if (snake.head.y !== this.game.table.cols - 1) {
          snake.head.y++;
        } else {
          this.stopGame(Error.BORDER_COLLAPSE);
        }
        break;
    }
    // this.game.table.fields[snake.head.x][snake.head.y].color = snake.headColor;
    if (this.game.isOn) {
      /* this.game.table.fields[snake.body[snake.body.length - 1].x][
        snake.body[snake.body.length - 1].y
      ].color = this.game.table.background; */
      this.game.snake.body.splice(this.game.snake.body.length - 1, 1);
      this.writeOut();
      this.checkFood(this.game.snake.head.x, this.game.snake.head.y);
      if (this.checkCollapse()) {
        this.stopGame('You ran into yourself!');
      }
    }
  }

  checkFood(x: number, y: number) {
    const food: Food = this.game.table.foods.find(
      f => f.position.x === x && f.position.y === y
    );
    if (food) {
      if (food.isKill) {
        this.stopGame(Error.KILLING_FOOD);
      } else {
        this.game.snake.length += food.value;
        for (let i = 0; i < food.value; i++) {
          this.game.snake.body.push(
            this.game.snake.body[this.game.snake.body.length - 1]
          );
        }
        this.game.table.foods = this.game.table.foods.filter(f => f !== food);
        this.game.table.foods.push(this.genFood(false, false));
        if (this.game.snake.length % 5 === 0) {
          this.game.table.foods.push(this.genFood(false, true));
        }
      }
    }
    return;
  }

  genFood(canBeKiller: boolean, beKiller: boolean): Food {
    const rnd = Math.floor(Math.random() * 3);
    let food: Food;
    if (beKiller) {
      food = { ...FOODS.killer };
    } else {
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
      if (food.isKill && !canBeKiller) {
        food = { ...FOODS.normal };
      }
    }
    let x = -1;
    let y = -1;
    do {
      x = Math.floor(Math.random() * this.game.table.cols);
      y = Math.floor(Math.random() * this.game.table.rows);
    } while (
      this.game.table.fields[x][y].color !== this.game.table.background ||
      (x === 5 && y >= 5 && y <= 9)
    );
    food.position = new Point(x, y);
    return food;
  }

  checkCollapse(): boolean {
    for (const i of this.game.snake.body) {
      if (this.game.snake.head.x === i.x && this.game.snake.head.y === i.y) {
        return true;
      }
    }
    return false;
  }
}
