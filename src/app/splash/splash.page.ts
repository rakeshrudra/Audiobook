import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

import * as moment from 'moment';

//import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
import { NewapiService } from '../newapi.service';
import { File } from '@ionic-native/file/ngx';
import { OfflinealertPage } from '../offlinealert/offlinealert.page';
const MEDIA_FOLDER_NAME = 'audios';

import { Device } from '@capacitor/device';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  defaultImage = '/assets/bg.jpg';
  defaultImagetext = '/assets/icon/text.png';
  logo = '/assets/icon/icon.png';
  classng = 'example-1'
  constructor( public modalCtrl: ModalController, public plt : Platform, public file : File, public alertController: AlertController, private market: Market, public router: Router, public api: ApiService, public _api: NewapiService) {}

  ngOnInit() {
    this.api.allbook({}).subscribe(async data => {
        await Storage.set({key:'allbooks',value: JSON.stringify(data)})
      }).add(val => {
        this.api.slider().subscribe(async data => {
          await Storage.set({key:'allslider',value: JSON.stringify(data)})
        },err=>{
          console.log(err,"api err")
          this.presentModal();
        }).add(() => {
          this.api.trandingaudio().subscribe(async data => {
            await Storage.set({key:'trandingaudio',value: JSON.stringify(data)})
          })
        })
      }).add(val => {
        this.api.modules().subscribe(async data => {
          await Storage.set({key:'allmodule',value: JSON.stringify(data)}).then(v=>{
            this.timmer()
         })
        })
      })
  }
  timmer() {
    setTimeout(() => { this.classng = 'example-2'; this.timmer1() }, 3000);
  }
 async timmer1() {

    const info = await Device.getInfo();
    const getId = await Device.getId();

    console.log(info,'info');
    console.log(getId,'getId');

          this._api.appupdatechecker("?appcode=40003").subscribe(val => {
            if (val.status == 1) {
              if (val.data == 1) {
                this.fupdate()
              }
              if (val.data == 0) {
                this.skipupdate()
              }
            } else {
              this.upchecker()
            }
          })
  }

  //// update alert

  async fupdate() {
    const alert = await this.alertController.create({
      header: 'Update',
      message: 'A new version is available for better performance and improved speed.',
      backdropDismiss : false,
      buttons: [
        {
          text: 'Update',
          cssClass: 'button success',
          handler: () => {
            this.market.open('com.urduaudiobooks.urdutafsir');
          }
        }
      ]
    });
    await alert.present();
  }

  async skipupdate() {
    const alert = await this.alertController.create({
      header: 'Update',
      message: 'A new version is available for better performance and improved speed.',
      backdropDismiss : false,
      buttons: [
        {
          text: 'Later',
          role: 'cancel',

          cssClass: 'button grey',
          handler: (blah) => {
            this.upchecker()
          }
        }, {
          text: 'Update',
          cssClass: 'button success',
          handler: () => {
            this.market.open('com.urduaudiobooks.urdutafsir');
          }
        }
      ]
    });

    await alert.present();
  }

  //////

 async upchecker() {
    await Storage.get({key:'lastdate'}).then( async lastdate => {
      if (!lastdate.value) {
        this.router.navigate(['/checkpermission'], { replaceUrl: true })
      } else {
        await Storage.get({key:'allaudios'}).then(async val => {
      if (val.value) {
        this.router.navigate(['/checkpermission'], { replaceUrl: true })
      } else {
        await Storage.set({key:'allaudios',value: JSON.stringify([]) }).then(val => {
          this.router.navigate(['/checkpermission'], { replaceUrl: true })
        })
      }
    })
  }
})
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      cssClass: "modal-cssdownload",
      component: OfflinealertPage,
      backdropDismiss : false
    });
    modal.onDidDismiss().then((val) => {
      if(val.data.offline)
      {
       this.router.navigate(['/tab/menu/download'])
      }
      else
      {
         this.ngOnInit();
      }
    })
      return await modal.present();
  }

}
