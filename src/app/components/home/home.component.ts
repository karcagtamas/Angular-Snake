import { Component, OnInit, HostListener } from '@angular/core';
import Game from 'src/app/models/game';
import Snake from 'src/app/models/snake';
import { Direction } from 'src/app/models/directions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  game: Game = new Game();
  interval;
  @HostListener('document:keypress', ['$event']) handleKeyPress(
    event: KeyboardEvent
  ) {
    switch (event.key) {
      case 'w':
        this.game.snake.direction = Direction.UP;
        break;
      case 's':
        this.game.snake.direction = Direction.DOWN;
        break;
      case 'a':
        this.game.snake.direction = Direction.LEFT;
        break;
      case 'd':
        this.game.snake.direction = Direction.RIGHT;
        break;
    }
  }

  constructor() {}

  ngOnInit() {
    console.log(this.game);
    this.setSnake();
  }

  setSnake() {
    this.game.snake = new Snake();
    const snake = this.game.snake;
    this.game.table.fields[snake.head.x][snake.head.y].color = snake.headColor;
    for (const i of snake.body) {
      this.game.table.fields[i.x][i.y].color = snake.bodyColor;
    }
  }

  startGame() {
    this.game.isOn = true;
    this.interval = setInterval(() => {
      this.moveForward();
    }, this.game.snake.speed);
  }

  moveForward() {
    const snake = this.game.snake;
    this.game.table.fields[snake.head.x][snake.head.y].color = snake.bodyColor;
    this.game.snake.body.unshift({ ...snake.head });
    switch (this.game.snake.direction) {
      case Direction.UP:
        if (snake.head.x !== 0) {
          snake.head.x--;
        } else {
          this.stopGame();
        }
        break;

      case Direction.DOWN:
        if (snake.head.x !== this.game.table.rows - 1) {
          snake.head.x++;
        } else {
          this.stopGame();
        }
        break;

      case Direction.LEFT:
        if (snake.head.y !== 0) {
          snake.head.y--;
        } else {
          this.stopGame();
        }
        break;

      case Direction.RIGHT:
        if (snake.head.y !== this.game.table.cols - 1) {
          snake.head.y++;
        } else {
          this.stopGame();
        }
        break;
    }
    this.game.table.fields[snake.head.x][snake.head.y].color = snake.headColor;
    if (this.game.isOn) {
      this.game.table.fields[snake.body[snake.body.length - 1].x][
        snake.body[snake.body.length - 1].y
      ].color = this.game.table.background;
      this.game.snake.body.splice(this.game.snake.body.length - 1, 1);
    }
  }

  stopGame() {
    this.game.isOn = false;
    clearInterval(this.interval);
  }
}
