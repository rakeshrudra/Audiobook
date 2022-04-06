import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeIST'
})
export class RemoveISTPipe implements PipeTransform {

  transform(value): unknown {
    let times =  value.replace('(IST)','');
    let timeAr = times.split(":");

    let hours = parseInt(timeAr[0]);
    let minutes = parseInt(timeAr[1]);
    let strMunit = minutes.toString();

    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12;
    if(minutes < 10){
      strMunit = '0'+ minutes.toString()
    }
    const strTime = hours.toString()+":"+strMunit+ampm;
    return strTime;
  }

}
