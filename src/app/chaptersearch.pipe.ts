import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chaptersearch'
})
export class ChaptersearchPipe implements PipeTransform {

  transform(values: any[], searchTerm: string): any {
    if(!values || !searchTerm)
    {
      return values;
    }
     return values.filter(list => list.chapter.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
     || list.chapterurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 )
  }

}
