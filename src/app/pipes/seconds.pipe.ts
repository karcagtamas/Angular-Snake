import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seconds'
})
export class SecondsPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    return Math.floor(value / 1000) + ' s';
  }
}
