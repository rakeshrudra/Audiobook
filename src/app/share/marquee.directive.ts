import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMarquee]'
})
export class MarqueeDirective {

  constructor( public el: ElementRef) {
    //console.log(el.nativeElement.offsetWidth)

 
    //  console.log('height---' + this.el.nativeElement.offsetHeight);  //<<<===here
    //  console.log('width---' + this.el.nativeElement.offsetWidth);    //<<<===here
   // el.nativeElement.style.backgroundColor = 'yellow';
 }


}
