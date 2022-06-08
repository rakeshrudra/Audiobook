import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications'
import { Storage } from '@capacitor/storage';
import { AlertController, ToastController } from '@ionic/angular';
import { timing } from '../newapi.service';

@Injectable({
  providedIn: 'root'
})
export class SetlocalnotificationService {

  constructor(private alert: ToastController) { }

 async changeDateSetup(dates = []){
   await Storage.get({key:'prayerAlertMonth'}).then(month=>{
    const d = new Date();
    const currentmonth = d.getMonth().toString();
     if(month.value && currentmonth == month.value){
     }else if(month.value && currentmonth !== month.value){
      this.creteNotifiy(dates)
     } else if(!month.value){
      this.creteNotifiy(dates)
     }
   })
  }

creteNotifiy(dates = []){
  //this.setNowNotification()
  let times = dates;
  for(let i =0; i < times.length;i++)
  {
    console.log(i)
  this.convertDate(times[i]);
  }

}

  async setLocalNotification(now, type) {
    let id = Math.floor(100000 + Math.random() * 900000);;
    await LocalNotifications.schedule({
      notifications: [
        {
          title: type+' Salah Alert',
          body: type+' Salah in 10 Minutes ',
          id: id,
          schedule:
          {
            at: now
          }
        }]
    }).then(v=>{
      console.log(v,now,type,'sets')
     // this.showAlert(now,type,'sets')
    }).catch(er=>{
      console.log(er,"set error")
    });
  }

async showAlert(b,c,d)
{
  const toast = await this.alert.create({
    message: b+c+" -- "+d,
    duration: 2000
  });
  toast.present();
}
  async convertDate(data){
      let prayerDate = data?.date?.gregorian?.date;
      this.nexPrayerTime(prayerDate,data?.timings);
  }


async  nexPrayerTime(givendate,times: timing) {
    //console.log(times)
    let date = givendate.split("-").reverse().join("-");
    //const rtext = " (+06)";
    const rtext = " (IST)";
    //FAJR
    let arr_f = times.Fajr.replace(rtext, "");
        arr_f = date+' '+arr_f;
    //Dhuhr
    let arr_d = times.Dhuhr.replace(rtext, "");
    arr_d = date+' '+arr_d;
    //ASR
    let arr_a = times.Asr.replace(rtext, "");
    arr_a = date+' '+arr_a;
    //Maghrib
    let arr_m = times.Maghrib.replace(rtext, "");
    arr_m = date+' '+arr_m;
    //Isha
    let arr_i = times.Isha.replace(rtext, "");
    arr_i = date+' '+arr_i;

    var now_f = new Date(arr_f);
    now_f.setMinutes(now_f.getMinutes() - 10); // timestamp
    now_f = new Date(now_f);

    var now_d = new Date(arr_d);
    now_d.setMinutes(now_d.getMinutes() - 10); // timestamp
    now_d = new Date(now_d);

    var now_a = new Date(arr_a);
    now_a.setMinutes(now_a.getMinutes() - 10); // timestamp
    now_a = new Date(now_a);

    var now_m = new Date(arr_m);
    now_m.setMinutes(now_m.getMinutes() - 10); // timestamp
    now_m = new Date(now_m);

    var now_i = new Date(arr_i);
    now_i.setMinutes(now_i.getMinutes() - 10); // timestamp
    now_i = new Date(now_i);
    var ToDate = new Date();

    if (now_i.getTime() > ToDate.getTime()) {
    this.setLocalNotification(now_f,'Fajr');
    this.setLocalNotification(now_d,'Dhuhr');
    this.setLocalNotification(now_a,'Asr');
    this.setLocalNotification(now_m,'Maghrib');
    this.setLocalNotification(now_i,'Isha');
    }
    const d = new Date();
    const currentmonth = d.getMonth();

    await Storage.set({key:'prayerAlertMonth',value : currentmonth.toString()})

    await LocalNotifications.getPending().then(plist=>{
      console.log(plist,"plist")
    })


  }

 setNowNotification(){
  var now_i = new Date();
  now_i.setMinutes(now_i.getMinutes() + 1); // timestamp
  now_i = new Date(now_i);
  var ToDate = new Date();

  this.setLocalNotification(now_i,'Fajr');

 }

}
