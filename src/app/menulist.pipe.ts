import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menulist'
})
export class MenulistPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
