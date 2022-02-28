import { Component, OnInit } from '@angular/core';
import { NewapiService } from '../newapi.service';

@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {

  response;
  timings;
  indexNo;
  constructor(private _api: NewapiService) { }

  ngOnInit() {
    const d = new Date();

    this.indexNo = d.getDate();

    this._api.prayerTime({latitude:23.5195,longitude:91.6542,method:1,month:d.getMonth()+1,year:d.getFullYear()}).subscribe(res=>{
      this.response = res;
      this.timings = this.response?.data;
    }).add(v=>{
    this._api.prayerTime({latitude:23.5195,longitude:91.6542,method:1,month:d.getMonth()+2,year:d.getFullYear()}).subscribe(res=>{
      this.response = res;
      this.timings = [...this.timings,...this.response?.data];
    })
  })
}

}
