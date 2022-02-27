import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeIST'
})
export class RemoveISTPipe implements PipeTransform {

  transform(value): unknown {
    return value.replace('(IST)','');
  }

}
