import { SetlocalnotificationService } from './../service/setlocalnotification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';

import { track } from '../model/track';
import { Platform, ToastController, IonContent } from '@ionic/angular';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';
import { Network } from '@ionic-native/network/ngx';
import { book } from '../model/book';
import { NewapiService } from '../newapi.service';
import { timeout } from 'rxjs/operators';

import { LocalNotifications } from '@capacitor/local-notifications'

import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {


  constructor(
    public route: ActivatedRoute,
    public toastCtrl: ToastController,
    public api: NewapiService,
    public _api: ApiService,
    public router: Router,
    public musicControls: MusicControls,
    public _localNotify: SetlocalnotificationService
  ) {
    api.currentLocationLat.subscribe(v => {
      this.currentPrayerTiming();
      console.log(v)
    })
  }
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    spaceBetween: -46,
    watchSlidesProgress: true,
    slidesPerView: 1,
    slidesPerColumn: 1,
    autoplay: {
      delay: 4000,
    },
  };
  slideOpts2 = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: -25,
    slidesPerView: 2,
    ionSlidePrevStart: true,
  };
  slideOpts3 = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 4,
    ionSlidePrevStart: true,
  };

  slideOptsTime = {
    initialSlide: 4,
    speed: 400,
    spaceBetween: -36,
    slidesPerView: 3,
    ionSlidePrevStart: true,
  };


  data = [];//this.route.snapshot.data['module'];;
  sliders = []//this.route.snapshot.data['slider'];
  books: book[] = [];
  taudiodata = this.route.snapshot.data['trandingaudio'];

  lastlist: track[] = [];
  activetrack: track;
  defaultImage = '/assets/loader.gif';
  defaultImageslide = '/assets/sliderimg.png';

  dailyaskar: track[] = [];
  timings;
  todayApiCall = false;

  async playslideraudio(id) {
    if (typeof id != undefined && id != '' && id != null) {
      await Storage.remove({ key: 'audioid' });
      this.api.audio('?a_id=' + id).subscribe(val => {
        this._api.playnextchapternext(false)
        this._api.audiolistnext(val)
        this._api.playnonext(0)
        this._api.showplayernext(true)
      })
    }

  }
  getColor(book: track) {
    return book.color;
  }

  async playpushaudio() {
    await Storage.get({ key: 'audioid' }).then(val => {
      if (val.value) {
        this.playslideraudio(val.value)
      }
    })

    if (this._api.chapterUrl.value != '') {
      var cp1 = this._api.chapterUrl.value;//localStorage.getItem('slug_topic');
      this._api.chapterUrlnext('');
      this.api.audio("?chapter_id=" + cp1).subscribe(result => {
        localStorage.removeItem('slug_chapter')
        this._api.playnextchapternext(false)
        this._api.audiolistnext(result)
        this._api.playnonext(0)
        this._api.showplayernext(true)
      })
    }
    if (this._api.topicUrl.value != '') {
      var cp2 = this._api.topicUrl.value;//localStorage.getItem('slug_topic');
      this._api.topicUrlnext('');
      this.api.audio("?topic=" + cp2).subscribe(result => {
        this._api.playnextchapternext(false)
        this._api.audiolistnext(result)
        this._api.playnonext(0)
        this._api.showplayernext(true)
      })

    }

  }

  async ngOnInit() {
    this.setLocalNotification();
    this._api.dailyazkar().subscribe(val => {
      this.dailyaskar = val;
    })
    await Storage.get({ key: 'allbooks' }).then((val) => {
      this.books = JSON.parse(val.value);
    })/*.then(() => { */
    /* this.storage.get('allmodule').then(val => {
       this.data = val
     })*/

    this.api.modules().subscribe(data => {
      this.data = data;
    })

    await Storage.get({ key: 'allslider' }).then(val => {
      this.sliders = JSON.parse(val.value);
    })
    await Storage.get({ key: 'trandingaudio' }).then(val => {
      this.taudiodata = JSON.parse(val.value);
    })

    //})



  }
  searchfocus() {
    // this.router.navigate(['/tab/search'])
  }
  play(track) {
    this._api.playnonext(0)
    this._api.audiolistnext([track])
    this.router.navigate(['/tab/home/play'])
  }
  palylast(i) {
    this._api.audiolistnext(this._api.currentAudioList.value)
    this._api.playnonext(i)
    this._api.showplayernext(true)
  }
  trandingpalylast(i) {
    this._api.playnextchapternext(false)
    this._api.audiolistnext(this.taudiodata)
    this._api.playnonext(i)
    this._api.showplayernext(true)
  }
  dailyaskarlist(i) {
    this._api.playnextchapternext(false)
    this._api.audiolistnext(this.dailyaskar)
    this._api.playnonext(i)
    this._api.showplayernext(true)
  }
  doRefresh(e) {
    this._api.slider().subscribe(data => {
      // this.sliders = data;
      e.target.complete();
    })
  }
  async ionViewDidEnter() {
    this.ionContent.scrollToTop(3);
    await Storage.get({ key: 'history' }).then(val => {
      if (val.value) {
        let list = JSON.parse(val.value);
        let clastlist = list.reverse();
        this._api.currentAudioListNext(clastlist);
      }
    }).then(async () => {
      await Storage.get({ key: 'lasttrack' }).then(val => {
        if (val.value) {
          this.activetrack = JSON.parse(val.value);
        }
      })
    })
    this.playpushaudio();

    setInterval(() => {
      this.playpushaudio();
    }, 5000);
    this.get_storedlist()
  }


  /// book url

  async urllink(module) {
    await Storage.get({ key: 'allbooks' }).then((val) => {
      if (val.value) {
        let values = JSON.parse(val.value);
        const playlist = values.filter(list => list.modules.toLowerCase().indexOf(module.toLowerCase()) !== -1)
        if (playlist.length == 1) {
          this.router.navigate(['/tab/home/chapter/', playlist[0].id])
          //this.router.navigate(['tab/home/book/', module])

        } else {
          this.router.navigate(['tab/home/book/', module])
        }
      }
    })
  }



  ///
  storedid = [];
  async get_storedlist() {
    await Storage.get({ key: "storedaudio" }).then(async (val) => {
      if (val.value) {
        this.storedid = JSON.parse(val.value);
      }
      else {
        this.storedid = []
      }
    })

  }
  checkstatusnew(alist: Array<any>) {
    if (alist) {
      var v = alist.every(v => this.storedid.includes(v));
      //console.log(alist,this.storedid,v);
      return v;
    } else {
      return true;
    }
  }

  nextPrTime() {
    let time = this.api.nexPrayerTime(this.api.todayTimings?.value);
    let timePosition = 0;
    if (time == 'Sunrise') timePosition = 0;
    if (time == 'Dhuhr') timePosition = 1;
    if (time == 'Asr') timePosition = 2;
    if (time == 'Maghrib') timePosition = 3;
    if (time == 'Isha') timePosition = 4;
    this.slideOptsTime.initialSlide = timePosition;
  }

  /////////////

  async currentPrayerTiming() {
    if (!this.todayApiCall) {
      this.timings = null;
      const method = localStorage.getItem('method') ? localStorage.getItem('method') : 4;
      const d = new Date();
      this.todayApiCall = true;
      this.api.prayerTime({ latitude: this.api.currentLocationLat.value ? this.api.currentLocationLat.value : 23, longitude: this.api.currentLocationLong.value ? this.api.currentLocationLong.value : 91, method: method ? method : 4, month: d.getMonth() + 1, year: d.getFullYear() }).subscribe(res => {
        this.timings = res?.data;
        this._localNotify.changeDateSetup(this.timings);
        this.todayTiming();
      }).add(v => {
        this.nextPrTime()
      })
    }
  }

  todayTiming() {
    const d = new Date();
    let day = d.getDate();
    let dayStr = day.toString();
    if (day < 10) {
      dayStr = '0' + dayStr;
    }
    let rr = this.timings.find(v => v.date.gregorian.day == dayStr);
    this.api.todayTimingsNext(rr.timings)
  }

  async setLocalNotification() {
  /*  var now = new Date();
    now.setMinutes(now.getMinutes() + 1); // timestamp
    now = new Date(now);

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Total notification',
          body: '',
          id: new Date().getTime(),
          schedule:
          {
            at: now
          }
        }]
    }).then(v=>{
      alert('alerm set');
    });*/
  }

}

