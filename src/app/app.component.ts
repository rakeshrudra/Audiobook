import { NewapiService } from './newapi.service';
import { Component, Inject , NgZone} from '@angular/core';

import { Platform, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DOCUMENT } from '@angular/common';
import { ApiService } from './api.service';
import { Storage } from '@ionic/Storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { Router, RouterEvent, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { Location } from '@angular/common';
import { File } from '@ionic-native/file/ngx';
const MEDIA_FOLDER_NAME = 'audios';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

import { PushNotifications } from '@capacitor/push-notifications';
import { App } from '@capacitor/app';

import { FCM } from '@capacitor-community/fcm';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
const fcm = new FCM();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  defaultImage = '/assets/bg.png';

  public appPages = [
    {
      title: 'Home',
      url: '/tab/home/landing',
      icon: 'home'
    },
    {
      title: 'Favourite',
      url: '/tab/home/favourite',
      icon: 'heart'
    },
    {
      title: 'History',
      url: '/tab/home/history',
      icon: 'apps'
    },
    {
      title: 'Notification',
      url: '/tab/home/notification',
      icon: 'megaphone'
    },
    {
      title: 'Feedback',
      url: '/tab/home/feedback',
      icon: 'at'
    }

  ];

  lastTimeBackPress = 0;
  timePeriodToExit = 400;
  counter = 0;
  alertShown = false;
  // prayer timing
  timings;
  timeApiCall = false;


constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    @Inject(DOCUMENT) private document: Document,
    private _api: ApiService,
    public _apiNew: NewapiService,
    public Storage: Storage,
    private screenOrientation: ScreenOrientation,
    // public network: Network,
    public toastCtrl: ToastController,
    public _router: Router,
    public loadingController: LoadingController,
    public musicControls: MusicControls,
    public alertController: AlertController,
    public location: Location,
    public file: File,
    private androidPermissions: AndroidPermissions,
    private zone : NgZone,
    private backgroundMode: BackgroundMode
      ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.statusBar.backgroundColorByHexString('#111111');
      setTimeout(() => {
        this.splashScreen.hide();
        //this.currentPrayerTiming();
      }, 1000)

   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.FOREGROUND_SERVICE).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.FOREGROUND_SERVICE)
  );

      this.platform.backButton.subscribeWithPriority(10000, () => {
        if (this._api.showplayer.value) {
          this._api.showplayernext(false);
        } else {
          this.goBack();
          if (this.counter < 2) {
            this.counter++;
            // this.presentToast('');
            setTimeout(() => { this.counter = 0 }, 2000)
          } else {
            // console.log("exitapp");
            // this.presentAlertConfirm();
            if (this._router.url == '/tab/home/landing') {
              this.presentAlertConfirm()
            }

          }
        }
      })


      ///


      this._api.activeClass.subscribe(val => {
        if (val) {

          document.body.classList.remove('light');
          document.body.classList.remove('dark');
          document.body.classList.add(this._api.activeClass.value);
          document.body.classList.add('primary');
          if(this._api.activeClass.value == 'dark')
          {
            this.statusBar.styleLightContent();
            this.statusBar.backgroundColorByHexString('#111111');
          }else{
            this.statusBar.styleLightContent();
            this.statusBar.backgroundColorByHexString('#004075');
            }
        }
        else {
          document.body.classList.add('light');
          document.body.classList.add('primary');
          this.statusBar.styleLightContent();
          this.statusBar.backgroundColorByHexString('#004075');

        }
      })


      this.pushnotification()

    });


    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(() => {
          // Example url: https://beerswift.app/tabs/tab2
          // slug = /tabs/tab2
          const slug = data.url.split(".info/").pop();
          var myArray = slug.split("/");

         // alert(JSON.stringify(myArray))

          if (myArray[0] == 'book') {
            this.Storage.set('slug_book',myArray[1]);
          }
          if (myArray[0] == 'chapter') {
            this._api.chapterUrlnext(myArray[1])
          }
          if (myArray[0] == 'topic') {
            this._api.topicUrlnext(myArray[1])
          }
          if (myArray[0] != 'book' && myArray[0] != 'chapter' && myArray[0] != 'topic') {
            this.Storage.set('audioid',myArray[0])
          }
      });
  });


  /// subscribe location set


  }
  async presentLoadingWithOptions() {
    const toast = await this.toastCtrl.create({
      message: 'loading...',
      duration: 10000,
      position: 'middle',
      color: 'success',
    });
    toast.present();
  }

  async conect() {
    const toast = await this.toastCtrl.create({
      message: 'You are online.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
  async disconect() {
    const toast = await this.toastCtrl.create({
      message: 'You are offline. Check your internet',
      duration: 2000,
      position: 'middle',
      color: 'danger',
    });
    toast.present();
  }
  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: 'Press back again to exit App? ' + a,
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

  //////////////////////////////////////



  async presentAlertConfirm() {
    if(!this.alertShown){
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Please confirm if you want to exit app',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'button success',
          handler: (blah) => {
            this.alertShown = false;
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          cssClass: 'button danger',
          handler: () => {
            ////console.log('Confirm Okay');
            this.alertShown = false;
            this.musicControls.destroy()
            navigator['app'].exitApp(); //Exit from app

          }
        }
      ]
    });

    await alert.present().then(v=>{
      this.alertShown = true;
    });
  }
  }

  goBack() {
    if (this._router.url === '/tab/home/landing') {
      this.presentAlertConfirm()
    } else {
      if (this._router.url === '/tab/menu/menulist') {
        this._router.navigate(['/tab/home/landing'])
      } else if (this._router.url === '/loader') {
        this._router.navigate(['/tab/home/landing'])
      } else {
        this.location.back();
      }
    }
  }

  ///
  async pushnotification(){

    this.backgroundMode.enable();

    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.addListener('registration', token => {

        alert('Push registration success, token: ' + token.value);

        fcm
        .subscribeTo({ topic: 'all' })
        .then((r) => {console.log(`subscribed to topic`)})
        .catch((err) =>{ console.log(err)});

      },
    );

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {        //alert('Push action performed: ' + JSON.stringify(notification));
        console.log('audioid',notification.notification.data.audioId);
        this.Storage.set('audioid',notification.notification.data.audioId);
      },
    );
  }

  ///

}
