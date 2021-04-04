import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, searchTerm: string): any {
    if (!searchTerm) {return value;}
    var re = new RegExp(searchTerm, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
   if(typeof value !== 'undefined')
   {
    return value.replace(re, "<mark>$&</mark>");
   }else
   {
     return true
   }
}

}
