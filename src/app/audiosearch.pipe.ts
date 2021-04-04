import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'audiosearch'
})
export class AudiosearchPipe implements PipeTransform {

  transform(values: any[], searchTerm: string): any {
    if(!values || !searchTerm)
    {
      return values;
    }
     return values.filter(list => 
      list.audioname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
     || list.audionameurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
     || list.bookname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
    || list.booknameurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
    || list.chapter.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
    || list.chapterurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
    || list.audio_tag.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
   // || list.audionameurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
    //|| list.booksynopsysenglish.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
    //|| list.booksynopsysurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
     )
  }

} 
/*
     return values.filter(list => 
      list.audioname ?list.audioname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
     || list.audionameurdu ? list.audionameurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1 
     || list.bookname ? list.bookname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
    || list.booknameurdu ? list.booknameurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1 
    || list.chapter ?list.chapter.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
    || list.chapterurdu ?list.chapterurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
    || list.audio_tag ? list.audio_tag.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
    || list.audionameurdu ?list.audionameurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
    || list.bookdetailsenglish ?list.bookdetailsenglish.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1: -1 
    || list.bookdetailsurdu ?list.bookdetailsurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
    || list.booksynopsysenglish ?list.booksynopsysenglish.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
    || list.booksynopsysurdu ?list.booksynopsysurdu.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : -1
*/