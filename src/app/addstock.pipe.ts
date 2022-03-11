import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addstock'
})
export class AddstockPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
