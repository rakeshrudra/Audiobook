import { async } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NewapiService } from '../newapi.service';
import { PrayersettingPage } from '../prayerTime/prayersetting/prayersetting.page';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {

  response;
  timings;
  indexNo;
  constructor(public _api: NewapiService, private modalController: ModalController) { }

 async ngOnInit() {
   this.timings = null;
    const ret = await Storage.get({ key: 'method' });
    const method = ret.value;

    const d = new Date();

    this.indexNo = d.getDate();

    this._api.prayerTime({latitude:this._api.currentLocationLat.value?this._api.currentLocationLat.value:23.5195,longitude:this._api.currentLocationLong.value?this._api.currentLocationLong.value:91.6542,method:method,month:d.getMonth()+1,year:d.getFullYear()}).subscribe(res=>{
      this.response = res;
      this.timings = this.response?.data;
    }).add(v=>{
    this._api.prayerTime({latitude:this._api.currentLocationLat.value?this._api.currentLocationLat.value:23.5195,longitude:this._api.currentLocationLong.value?this._api.currentLocationLong.value:91.6542,method:method,month:d.getMonth()+2,year:d.getFullYear()}).subscribe(res=>{
      this.response = res;
      this.timings = [...this.timings,...this.response?.data];
    })
  })
}
async presentSettingModal() {
  const modal = await this.modalController.create({
    component: PrayersettingPage,
    backdropDismiss : true,
    swipeToClose: true,
    cssClass:"filterModal"

  });
   await modal.present();

   await modal.onDidDismiss().then(v=>{
     this.ngOnInit();
   })
}


}
