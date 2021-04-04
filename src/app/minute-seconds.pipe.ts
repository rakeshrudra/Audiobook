import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value): string {
    if(value)
    {
     
    const minutes: number = Math.floor(value / 60);
    const sec  : number =   Math.round(value - minutes * 60);
    return minutes.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0')
    }else
    {
      return '00:00';
    }
 }

}
