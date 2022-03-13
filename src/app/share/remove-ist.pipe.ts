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
    console.log(minutes)

    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12;
    const strTime = hours+":"+minutes+ampm;
    return strTime;
  }

}
