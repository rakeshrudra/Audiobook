import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NewapiService } from 'src/app/newapi.service';

const { Storage } = Plugins;
@Component({
  selector: 'app-prayersetting',
  templateUrl: './prayersetting.page.html',
  styleUrls: ['./prayersetting.page.scss'],
})
export class PrayersettingPage implements OnInit {

  constructor(private _apiNew: NewapiService) { }
  methodVal;
  timings;

 async ngOnInit() {
    const ret = await Storage.get({ key: 'method' });
    this.methodVal = ret.value;
  }
  setMethod()
  {
    this.setObject();
  }
  async setObject() {
    localStorage.setItem('method',this.methodVal)
    await Storage.set({
      key: 'method',
      value: this.methodVal
    }).then(v=>{
      this.currentPrayerTiming();
    });

  }


  async currentPrayerTiming()
  {
    this.timings = null;
    const method = localStorage.getItem('method')?localStorage.getItem('method'):4;
    const d = new Date();
    this._apiNew.prayerTime({latitude:this._apiNew.currentLocationLat.value?this._apiNew.currentLocationLat.value:23.5195,longitude:this._apiNew.currentLocationLong.value?this._apiNew.currentLocationLong.value:91.6542,method:method?method:4,month:d.getMonth()+1,year:d.getFullYear()}).subscribe(res=>{
      this.timings = res?.data;
      this.todayTiming();
    })
  }

  todayTiming(){
    const d = new Date();
    let day = d.getDate();
    let dayStr = day.toString();
    if(day < 10){
      dayStr = '0'+dayStr;
    }
    let rr = this.timings.find(v=> v.date.gregorian.day == dayStr);
    this._apiNew.todayTimingsNext(rr.timings)
   }


}
