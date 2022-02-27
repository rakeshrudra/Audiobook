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
  constructor(private _api: NewapiService) { }

  ngOnInit() {
    this._api.prayerTime({latitude:17.3850,longitude:78.4867,method:2,day:27,month:2,year:2022}).subscribe(res=>{
      this.response = res;
      this.timings = this.response?.data[0]?.timings
    })
  }

}
