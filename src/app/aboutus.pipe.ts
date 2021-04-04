import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aboutus'
})
export class AboutusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
