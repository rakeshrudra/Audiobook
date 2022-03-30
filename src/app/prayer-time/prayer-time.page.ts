import { async } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NewapiService } from '../newapi.service';
import { PrayersettingPage } from '../prayerTime/prayersetting/prayersetting.page';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

const { Storage } = Plugins;

export interface Currentlocation{
  countryName: string,
  administrativeArea: string,
  locality: string,
  subAdministrativeArea: string,
}
@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {

  response;
  timings;
  indexNo;
  userLocation: Currentlocation;
  constructor(public _api: NewapiService, private modalController: ModalController, private nativeGeocoder: NativeGeocoder) { }

 async ngOnInit() {
   this.timings = null;
    const ret = await Storage.get({ key: 'method' });
    const method = ret.value;

    const d = new Date();

    this.indexNo = d.getDate();

    this._api.prayerTime({latitude:this._api.currentLocationLat.value?this._api.currentLocationLat.value:23.5195,longitude:this._api.currentLocationLong.value?this._api.currentLocationLong.value:91.6542,method:method,month:d.getMonth()+1,year:d.getFullYear()}).subscribe(res=>{
      this.response = res;
      this.timings = this.response?.data;
      this.todayTiming();
    }).add(v=>{
    this._api.prayerTime({latitude:this._api.currentLocationLat.value?this._api.currentLocationLat.value:23.5195,longitude:this._api.currentLocationLong.value?this._api.currentLocationLong.value:91.6542,method:method,month:d.getMonth()+2,year:d.getFullYear()}).subscribe(res=>{
      this.response = res;
      this.timings = [...this.timings,...this.response?.data];
    })
  })

  this.fullAddress();
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

fullAddress(){
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  this.nativeGeocoder.reverseGeocode(this._api.currentLocationLat.value?this._api.currentLocationLat.value:23.5195,this._api.currentLocationLong.value?this._api.currentLocationLong.value:91.6542, options)
    .then((result: any) => {
      this.userLocation = result[0]
    })
    .catch((error: any) => console.log(error));
}


////
todayTiming(){
 let rr = this.timings.find(v=> v.date.gregorian.day == '08');
 console.log(rr,"rr")
}

}
