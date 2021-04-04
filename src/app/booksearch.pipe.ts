import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booksearch'
})
export class BooksearchPipe implements PipeTransform {

  transform(values: any[], searchTerm: string): any {
    if(!values || !searchTerm)
    {
      return values;
    }
     return values.filter(list => list.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
     || list.nameurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
     || list.synopsys.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
     || list.synopsysurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    || list.details.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    || list.detailsurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      )
  }

}
