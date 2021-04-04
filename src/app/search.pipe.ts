import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: any[], searchTerm: string): any {
    if(!values || !searchTerm)
    {
      return values;
    }
     return values.filter(list => list.chapter.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 )
  }

}
