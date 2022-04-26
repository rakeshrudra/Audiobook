import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}
  transform(value) {
   let value1 = value.toString();
    value1 = value1.replace('font-family','font-fam:');
   return value1;
}


}
