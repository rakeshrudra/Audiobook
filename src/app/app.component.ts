import { Component, Inject , NgZone} from '@angular/core';

import { Platform, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DOCUMENT } from '@angular/common';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { Router, RouterEvent, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { Location } from '@angular/common';
import { File } from '@ionic-native/file/ngx';
const MEDIA_FOLDER_NAME = 'audios';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {
  Plugins,
  PushNotification,
  Geolocation,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';

import { FCM } from '@capacitor-community/fcm';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
const fcm = new FCM();
const { PushNotifications,App , FCMPlugin } = Plugins;


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
  public data: DeviceOrientationCompassHeading = null;
  public currentLocation = null;
  // Initial Kaaba location that we've got from google maps
  private kaabaLocation: {lat:number,lng:number} = {lat: 21.42276, lng: 39.8256687};
  // Initial Qibla Location
  public qiblaLocation = 0;


constructor(private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    @Inject(DOCUMENT) private document: Document,
    private _api: ApiService,
    public storage: Storage,
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
    private zone : NgZone
  ) {
    /*network.onConnect().subscribe(()=>{
      this.conect()
    })
    network.onDisconnect().subscribe(()=>{
      this.disconect()
    })
*/
    this.initializeApp();

    // stop connect watch
    this._router.events.subscribe((RouterEvent: Event) => {
      if (RouterEvent instanceof NavigationStart) {
        let url = RouterEvent.url;
        let urlar = url.split('/');
        // console.log(urlar)
        if (RouterEvent.url != '/' && RouterEvent.url != '/loader' && urlar[2] != 'menu') {
          // this.presentLoadingWithOptions()
        }
      }
      if (RouterEvent instanceof NavigationEnd) {
        let url = RouterEvent.url;
        let urlar = url.split('/');
        if (urlar[2] == 'home') {
          //this.toastCtrl.dismiss()
        }
      }
      if (RouterEvent instanceof NavigationError) {
        let url = RouterEvent.url;
        let urlar = url.split('/');
        if (urlar[2] == 'home') {
          //this.toastCtrl.dismiss()
        }
      }
      if (RouterEvent instanceof NavigationCancel) {
        let url = RouterEvent.url;
        let urlar = url.split('/');
        if (urlar[2] == 'home') {
          //this.toastCtrl.dismiss()
        }
      }
    })

    this.deviceOrientation.watchHeading().subscribe((res: DeviceOrientationCompassHeading) => {
      this.data = res;
      // Change qiblaLocation when currentLocation is not empty
      if (!!this.currentLocation) {
        const currentQibla = res.magneticHeading-this.getQiblaPosition();
        this.qiblaLocation = currentQibla > 360 ? currentQibla%360 : currentQibla;
      }
    });
    // Watch current location

    this.kkk();
  }
async kkk(){
  //console.log(hh,"this.geolocation.watchPosition")
    await Geolocation.watchPosition({}, (position, err) => {
      this.currentLocation = position;
      console.log(position,"position")
    })
}
  getQiblaPosition() {
    // Convert all geopoint degree to radian before jump to furmula
    const currentLocationLat = this.degreeToRadian(this.currentLocation.coords.latitude);
    const currentLocationLng = this.degreeToRadian(this.currentLocation.coords.longitude);
    const kaabaLocationLat = this.degreeToRadian(this.kaabaLocation.lat);
    const kaabaLocationLng = this.degreeToRadian(this.kaabaLocation.lng);

    // Use Basic Spherical Trigonometric Formula
    return this.radianToDegree(
      Math.atan2(
        Math.sin(kaabaLocationLng-currentLocationLng),
        (Math.cos(currentLocationLat) * Math.tan(kaabaLocationLat) - Math.sin(currentLocationLat) * Math.cos(kaabaLocationLng - currentLocationLng))
      )
    );
  }

  /**
   * Convert from Radian to Degree
   * @param radian
   */
  radianToDegree(radian: number) {
    return radian * 180 / Math.PI;
  }

  /**
   * Convert from Degree to Radian
   * @param degree
   */
  degreeToRadian(degree: number) {
    return degree * Math.PI / 180;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.statusBar.backgroundColorByHexString('#111111');
      setTimeout(() => {
        this.splashScreen.hide();

      }, 1000)
  /*  this.fcm.getToken().then(token => {
      console.log('fcm',token);
    },er=>{
      console.log('fcm err',er)
    });
*/

   //////////////

   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.FOREGROUND_SERVICE).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.FOREGROUND_SERVICE)
  );



  /*  this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
       // this.router.navigate([data.landing_page, data.price]);
      } else {
        console.log('Received in foreground');
        //this.router.navigate([data.landing_page, data.price]);
      }
    });*/

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
            this.storage.set('slug_book',myArray[1]);
          }
          if (myArray[0] == 'chapter') {
            this._api.chapterUrlnext(myArray[1])
          }
          if (myArray[0] == 'topic') {
            this._api.topicUrlnext(myArray[1])
          }
          if (myArray[0] != 'book' && myArray[0] != 'chapter' && myArray[0] != 'topic') {
            this.storage.set('audioid',myArray[0])
          }
          // If no match, do nothing' - let regular routing
          // logic take over
      });
  });

  }
  async presentLoadingWithOptions() {
    /* const loading = await this.loadingController.create({
       duration: 6000,
       message: 'Loading.',
       translucent: true,
       cssClass: 'custom-class custom-loading'
     });
     return await loading.present(); */
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
  pushnotification(){
    //console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        //alert('Push registration success, token: ' + token.value);
        //console.log(token.value);
        fcm
        .subscribeTo({ topic: 'all' })
        .then((r) => {console.log(`subscribed to topic`)})
        .catch((err) =>{ console.log(err)});

        this._api.get_fbtoken(token.value).subscribe(v=>{

        })
      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      //alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        //alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
        console.log('audioid',notification.notification.data.audioId);
        this.storage.set('audioid',notification.notification.data.audioId);
      },
    );
  }
}
