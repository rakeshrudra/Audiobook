import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import * as moment from 'moment';
import { track } from '../model/track';
//import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
import { NewapiService } from '../newapi.service';
import { File } from '@ionic-native/file/ngx';
import { OfflinealertPage } from '../offlinealert/offlinealert.page';
const MEDIA_FOLDER_NAME = 'audios';

import { Plugins } from '@capacitor/core';

const { App,  Device } = Plugins;

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
  constructor( public modalCtrl: ModalController, public network : Network, public plt : Platform, public file : File, public alertController: AlertController, private market: Market, public router: Router, public api: ApiService, public _api: NewapiService, public storage: Storage) {
   // this.loadFiles();
    //this.presentModal();
  }

networkck()
{
  let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
   // console.log('network was disconnected :-(');
    this.presentModal();
  });
  // stop disconnect watch
  disconnectSubscription.unsubscribe();
}
  ngOnInit() {
    this.plt.ready().then(() => {
      let path = this.file.dataDirectory;
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
        () => {
         // this.loadFiles();
         console.log("dir created",path)
        },
        err => {
          this.file.createDir(path, MEDIA_FOLDER_NAME, false);
        }
      );
    });
    /*this.api.updatecheck().subscribe(val=>{
      if(val.status == 1)
      {
         this.timmer1();
      }else
      {
        this.router.navigate(['/loader'], { replaceUrl: true })
      }
    })*/
    this.api.allchapters({}).subscribe(data => {
      this.storage.set('chapters', data).then(() => {
      })
    }).add(a => {
      this.api.allbook({}).subscribe(data => {
        this.storage.set('allbooks', data).then(() => {
          // this.timmer()
        })
      }).add(val => {
        this.api.slider().subscribe(data => {
          this.storage.set('allslider', data).then(() => {
            // this.timmer()
          })
        },err=>{
          this.presentModal();
        }).add(() => {
          this.api.trandingaudio().subscribe(data => {
            this.storage.set('trandingaudio', data).then(() => {
              // this.timmer()
            })

          })
        })
      }).add(() => {
        this.api.alltopic().subscribe(data => {
          this.storage.set('alltopic', data).then(() => {
            // this.timmer()
          })

        })
      }).add(val => {
        this.api.modules().subscribe(data => {
          this.storage.set('allmodule', data).then(() => {
            this.timmer()
          })
        })
      })
    })
  }
  ngOnInit1() {
    this.api.allchapters({}).subscribe(data => {
      this.storage.set('chapters', data).then(() => {
        this.timmer()
      })
    })
  }
  timmer() {
    setTimeout(() => { this.classng = 'example-2'; this.timmer1() }, 3000);
  }
 async timmer1() {
    /*setTimeout(() => {
      let date  = moment().format("YYYY-MM-DD hh:mm:ss")
      this.storage.set('lastdate', date)
      this.router.navigate(['tab/home/landing'], { replaceUrl: true })
    }, 1000);*/

    const info = await Device.getInfo();

    //    this.appVersion.getVersionCode().then(e => {
          this._api.appupdatechecker("?appcode=" + info.appBuild).subscribe(val => {
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
    //    });
  }
  ionViewDidEnter() {
    /*setTimeout(()=>{
      this.router.navigate(['/tab'], { replaceUrl: true })
     }, 6000);*/
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

  upchecker() {
    this.storage.get('lastdate').then(val => {
      if (!val) {
        this.router.navigate(['/loader'], { replaceUrl: true })
      } else {

    this.storage.get('allaudios').then((val: track[]) => {
      if (val) {
        this.router.navigate(['tab/home/landing'], { replaceUrl: true })
      } else {
        this.storage.set('allaudios', []).then(() => {
          this.router.navigate(['/loader'], { replaceUrl: true })
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
