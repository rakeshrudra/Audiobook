import { AudioContentPage } from './../audio-content/audio-content.page';
import { NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, LoadingController, ModalController } from '@ionic/angular';

import { Howl, howler } from 'howler';
import { IonRange } from '@ionic/angular';
import { ApiService } from '../api.service';
//import { Storage } from '@ionic/storage';
import { track } from '../model/track';

import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';

import { Router, NavigationStart, ActivatedRoute, Event } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { File } from '@ionic-native/file/ngx';

import { Media, MediaObject } from '@ionic-native/media/ngx';
import { DownloadService } from '../service/download.service';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AutoloadService } from '../service/autoload.service';
import { PlaynewmediaService } from '../service/playnewmedia.service';
import { NewapiService } from '../newapi.service';
const MEDIA_FOLDER_NAME = 'audios';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { Share } from '@capacitor/share';
import { Geolocation } from '@capacitor/geolocation';

import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild('myTabs', { static: true }) myTabs: IonTabs;
  audiobcdata = [];
  downloadingStatus: boolean = false;

  searchready: boolean = false;
  async ngOnInit() {
    await Storage.get({key:'activeClass'}).then(val => {
      this.api.activeClassnext(val.value);
    })
    //   alert(this.api.activeClass.value)
    this.api.allchapters({}).subscribe(async data => {
       await Storage.set({key:'chapters', value: JSON.stringify(data)}).then(() => {
      })
    }).add(() => {
      this.api.alltopic().subscribe(async data => {
          // this.timmer()
          await Storage.set({key:'alltopic', value: JSON.stringify(data)}).then(() => {

      })
    })
    }).add(v => {
      this.deviceOrient();
    })

  }
 async change(val) {
    this.api.activeClassnext(val);
    this._api.activeClassnext(val);
    await Storage.set({key:'activeClass', value: val})
  }

  showplayer: boolean = false;
  repeataudio: boolean = false;
  playlist: track[] = []
  activeTrack: track = null;
  palyer: Howl = null;
  isplaying: boolean = false;
  loader: boolean = false;
  title: string = null;
  duration: string = null;
  ctime: number = 0;
  trackNo: number = null;
  disableButton: boolean = false;
  progress = 0;
  favourit = [];
  playno = this.api.playno.value;
  nexttrackId = 0;
  defaultImage = '/assets/loader.gif';
  defaultImageslide = '/assets/sliderimg.png';
  nextplaylist: track[] = [];
  previousplaylist: track[] = [];
  tab = 'home';
  jsonaudio = '/assets/audios.json';
  ////
  timings;

  ///////////// dwnload ver

  downloadPlaylist: track[] = [];
  downloadActiveTrack: track = null;
  downloadPlayer: MediaObject = null;
  downloadShowplayer = false
  dounloadisloading = false;
  dounloadisplaying = false;
  downloadcurrenttrackno: number = 0

  isloading: boolean = false;

  public data: DeviceOrientationCompassHeading = null;
  public currentLocation = null;
  public currentLocationtt = null;
  // Initial Kaaba location that we've got from google maps
  private kaabaLocation: { lat: number, lng: number } = { lat: 21.42276, lng: 39.8256687 };
  // Initial Qibla Location
  public qiblaLocation = 0;



  constructor(private deviceOrientation: DeviceOrientation,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private socialSharing: SocialSharing,
    public _router: ActivatedRoute,
    public api: ApiService,
    public _api: NewapiService,
    public router: Router,
    public musicControls: MusicControls,
    public file: File,
    public media: Media,
    public _downloadService: DownloadService,
    private transfer: FileTransfer,
    public _download: DownloadService,
    public _autoload: AutoloadService,
    public _downloadPlay: PlaynewmediaService,
    private firebaseDynamicLinks: FirebaseDynamicLinks
  ) {

    ///////////
    //  this.notifcation()
    _download.start();

    api.audiolist.subscribe((val: track[]) => {
      this.playlist = val;
      if (val.length > 0) {
        if (this.palyer) {
          this.palyer.unload()
        }
        // this.start(val[this.api.playno.value])
      }
      //this.showplayer = true;
    })

    api.playno.subscribe(() => {
      api.audiolist.subscribe(val => {
        this.playlist = val;
        if (val.length > 0) {
          if (this.palyer) {
            this.palyer.unload();
            this.repeataudio = false;
          }
          this.play(this.api.playno.value)
        }
        // this.showplayer = true;
      })
    })
    /// all new audios
      this.allnewAudio();
    ///


    this.router.events.subscribe((RouterEvent: Event) => {

      if (RouterEvent instanceof NavigationStart) {
        let url = RouterEvent.url.split('/');
        this.tab = url[2];
        ////console.log(this.tab)
        this.api.showplayernext(false);
      }
    })

  }

  async allnewAudio(){
    await Storage.get({key:'lastdate'}).then(lastdate => {

      this._api.latestaudio('?lastdate=' + lastdate.value).subscribe(async (val: track[]) => {
        if (val.length > 0) {

          await Storage.get({key:'allaudios'}).then(async (list) => {
            let e = JSON.parse(list.value);
            var ff = e;
            for (var i = 0; i < val.length; i++) {
              ff = ff.filter(e => e.id != val[i].id);
              //this.storage.set('allaudios',ff)
            }
            var newar = ff.concat(val);
            await Storage.set({key:'allaudios', value: JSON.stringify(newar)})
            var date = new Date().toLocaleString();
            await Storage.set({key:'lastdate', value:date})

          })
        } else {
          var date = new Date().toLocaleString();
          await Storage.set({key:'lastdate', value:date})
        }
      })
    })
  }

  async trimurl() {

  }
  @ViewChild('range', { static: false }) range: IonRange;
  payId;
  async start(track: track) {
    this._downloadPlay.download_close()
    // this.api.audiolistnext(null)
    //this.download_close()
    if (track.new == 'true') {
      this.storepayaudio(track.id)
    }
    await new Promise((resolve, reject) => {
      if (typeof track.download !== undefined && track.download == 1) {
        var dir = this.file.dataDirectory + track.url.replace(/^file:\/\//, '');
        var dirf = dir.replace(/^file:\/\//, '');
        var dirf = dirf.replace('//audios', '/audios');
        dirf = '.' + dirf;
        resolve(dirf)
      } else {
        resolve(track.url)
      }
    }).then((url) => {

      if (this.palyer) { this.palyer.unload() }

      this.topicimage = '';
      this.loader = true;
      this.ctime = 0;
      this.palyer = new Howl({
        html5: true,
        src: [url],
        //loop: true,

        html5PoolSize: 100,
        onload: (e) => {
          //console.log(e, "l")

          this.loader = true;
          this.duration = this.palyer.duration();
          this.disableButton = false;
          this.ctime = 0;
        },
        onstop: (e) => {
          //console.log(e, "s")
        }
        , onplayerror: function (e) {
          //console.log(e)
          this.palyer.once('unlock', function () {
            this.palyer.play();
          });
        },
        onplay: async (e) => {
          //console.log(e, "p")
          this.payId = e;
          this.notificationCall = false;
          this.loader = false;
          this.activeTrack = track;
          this.isplaying = true;
          this.title = this.activeTrack.audioname;
          this.disableButton = true;
          this.trackNo = this.playlist.indexOf(this.activeTrack);
          this.updateProgress();
          this.updatecurrenttime();
          this.storehistory(track);
          this.storebook(track);
          this.createControls();
          this.topicimg();
          this.api.currentaudionext(this.activeTrack);
          this.api.activetracknext(this.activeTrack);
          this.nextchapteraodios();
          await Storage.set({key:'playlist', value: JSON.stringify(this.playlist)});
          await Storage.set({key:'lasttrack', value: JSON.stringify(this.activeTrack)});
          let index = this.playlist.indexOf(this.activeTrack);
          this.nexttrackId = index + 1;
          //console.log(this.palyer)
          this.preloadoudio();
          this.ckfeb(track)
        },
        onend: (e) => {
          //console.log(e, "e")
          if (!this.repeataudio) {
            if (this.api.playnextchapter.value) {
              this.next()
            } else {
              this.api.showplayernext(false)
              this.api.audiolistnext([])
              this.close()
            }
          }
          else {
            this.playagain();
          }
        }
      })
      this.palyer.play();
    })

  }
  next() {
    if (this.palyer) { this.palyer.unload() }
    this.repeataudio = false;
    this.progress = 0;
    if (this.disableButton) {
      let index = this.playlist.indexOf(this.activeTrack);
      if (this.nexttrackId < this.playlist.length) {
        this.activeTrack = this.playlist[index + 1]
        this.start(this.playlist[index + 1])
        //this.storage.set('playnextid', index + 1)
        this.nextchapteraodios();
      }
      else {
        //this.close();
        this.api.showplayernext(false);
        this.playnextchapter()
      }
      this.musicControls.updateIsPlaying(false);
    }

  }
  previous() {
    if (this.palyer) { this.palyer.unload() }
    this.repeataudio = false;
    this.progress = 0;
    if (this.disableButton) {
      let index = this.playlist.indexOf(this.activeTrack)
      if (this.trackNo > 0) {
        this.start(this.playlist[this.trackNo - 1])
        this.trackNo = this.trackNo - 1;
        //this.storage.set('playnextid', this.trackNo)

      } else {
        //this.start(this.playlist[0])
        this.previouschapteraodios();
      }
      this.musicControls.updateIsPlaying(false);
    }
  }
  /// !======================! ///

  repeatoff() {
    this.repeataudio = false;
  }
  playagain() {
    if (this.disableButton) {
      let index = this.playlist.indexOf(this.activeTrack);
      this.palyer.unload();
      if (this.nexttrackId < this.playlist.length) {
        this.activeTrack = this.playlist[index]
        this.start(this.playlist[index])
       // this.storage.set('playnextid', index)
        this.nextchapteraodios();
      }
      else {
        //this.close();
        this.api.showplayernext(false);
        this.playnextchapter()
      }
      this.musicControls.updateIsPlaying(false);
    }
  }

  togglePlayer(pause) {
    this.isplaying = !pause;
    if (pause) {
      this.musicControls.updateIsPlaying(false)
     /* CapacitorMusicControls.updateIsPlaying({
        isPlaying: false, // affects Android only
      });*/
      if (this.palyer.playing()) {
        this.musicControls.updateIsPlaying(true)
        this.palyer.pause();
      }
      // //console.log(this.palyer.pause(),'pause')
    } else {
      this.musicControls.updateIsPlaying(true)

      /*CapacitorMusicControls.updateIsPlaying({
        isPlaying: true, // affects Android only
      });*/
      if (!this.palyer.playing()) {
        this.palyer.play();
      }
      // //console.log(this.palyer.play(),'play');
    }
  }

  pause() {
    this.palyer.pause();
    this.musicControls.updateIsPlaying(false);
   /* CapacitorMusicControls.updateIsPlaying({
      isPlaying: false, // affects Android only
    });*/
  }
  toggleplay() {
    this.palyer.play();
    this.musicControls.updateIsPlaying(false);
  }

  seek() {
    this.palyer.pause();
    let newvalue = +this.range.value;
    let duration = this.palyer.duration();
    this.palyer.seek(duration * (newvalue / 100))
    this.palyer.play();
  }
  updateProgress() {
    if (this.palyer) {
      let seek = this.palyer.seek();
      this.progress = (seek / this.palyer.duration()) * 100 || 0;
      setTimeout(() => {
        this.updateProgress();
      }, 1000)
    }
  }
  updatecurrenttime() {
    let seek = this.palyer.seek();
    this.ctime = seek;
    setTimeout(() => {
      this.updatecurrenttime();
    }, 1000)
  }
  hide() {
    this.api.showplayernext(false);
    this.api.showplayerinnextnext(false);
  }
  show() {
    this.api.showplayernext(true);
    this.api.showplayerinnextnext(false);
  }
  close() {
    this.api.playnextchapternext(true)
    this.api.showplayerinnextnext(true);
    this.showplayer = false;
    this.palyer.unload();
    this.playlist = []
    //this.musicControls.destroy()
    //CapacitorMusicControls.destroy();
    this.activeTrack = null
    //this.router.navigate(['/tab/home/'])
  }
 async storehistory(track: track) {
    await Storage.get({key:'history'}).then(async (list) => {
      if(list.value)
      {
        let val = JSON.parse(list.value);
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.push(track);
          await Storage.set({key:'history', value: JSON.stringify(this.favourit)});
          this.api.currentAudioListNext(this.favourit);
        }
        else {
          await Storage.set({key:'history', value: JSON.stringify([track])})
        }
      }
      else {
        await Storage.set({key:'history', value: JSON.stringify([track])})
      }
    }else{
      await Storage.set({key:'history', value: JSON.stringify([track])})

    }
    })

  }
  play(i) {
    if (this.palyer) {
      this.palyer.unload();
    }
    this.start(this.playlist[i])
    //this.storage.set('playnextid', i)
  }
  playcurrent() {
    this.musicControls.updateIsPlaying(true)
    this.palyer.play();
    //console.log('1')
   /* CapacitorMusicControls.updateIsPlaying({
      isPlaying: true, // affects Android only
    });*/
  }


  createControls() {
    this.musicControls.create({
      track: this.activeTrack.audioname,
      artist: this.activeTrack.chapter,
      cover: 'https://islamicaudiobooks.info/audioapp/assets/upload/dd.jpeg',
      isPlaying: true,
      hasPrev: true,
      hasNext: true,
      dismissable: true,
    });

    this.musicControls.subscribe().subscribe(action => {
      const message = JSON.parse(action).message;
      switch (message) {
        case 'music-controls-play':
          this.playcurrent();
          break;
        case 'music-controls-pause':
          this.pause();
          break;
        case 'music-controls-next':
          this.next()
          break;
        case 'music-controls-previous':
          this.previous()
          break;
        case 'music-controls-destroy':
          this.close()
          break;
      }
    });

    this.musicControls.listen();
  }
  searchfocus() {
    //this.router.navigate(['/tab/search'])
  }
 async storebook(track) {
    await Storage.get({key:'book'}).then(async list => {
      if(list.value)
      {
        let valc = JSON.parse(list.value);
      if (valc) {
        const filteredPeople = valc.filter((item) => item.id != track.book_id);
        const filteredPeople1 = valc.filter((item) => item.id == track.book_id);

        if (Array.isArray(filteredPeople1)) {
          if (filteredPeople1.length > 0) { } else {
            this.api.book(track).subscribe(async val => {
              await Storage.set({key:'book', value: JSON.stringify(val)}).then()
            })
          }
        } else {
          this.favourit = filteredPeople;
          ////console.log(this.favourit,'3')
          this.api.book(track).subscribe(async val => {
            this.favourit.push(val[0])
            await Storage.set({key:'book', value: JSON.stringify(this.favourit)}).then(c => {
              this.favourit = [];
            })
          })
        }
      }
      else {
        this.api.book(track).subscribe(async val => {
          ////console.log(val,"4")
          await Storage.set({key:'book', value: JSON.stringify(val)}).then()
        })
      }
    }
    })
  }
  nextchapteraodios() {
    if (this.api.playno.value <= this.playlist.length) {
      this._api.get_nextchapteraudio('?id=' + this.activeTrack.id).subscribe(val => {
        this.nextplaylist = val
      })


    } else {
      this.close()
    }
  }


 async previouschapteraodios() {
    //console.log(this.api.playno.value);
    await Storage.get({key:'allaudios'}).then((val) => {
      if(val.value)
      {
        let tracks = JSON.parse(val.value);
      if (this.activeTrack.topic != '') {
        let chapter_id = this.activeTrack.chapter_id;
        let topic_id = parseInt(this.activeTrack.topic) - 1;
        this.previousplaylist = tracks.filter((val: track) => val.book_id == this.activeTrack.book_id && val.topic == topic_id.toString() && val.chapter_id == chapter_id);
        if (this.previousplaylist && this.previousplaylist.length > 0) {
          this.api.audiolistnext(this.previousplaylist)
          let trac = this.previousplaylist.length - 1;
          this.api.playnonext(trac)
          this.nextplaylist = []

        } else {
          this.api.showplayernext(false)
          this.close()
        }
      } else {
        let chapter_id = parseInt(this.activeTrack.chapter_id) - 1;
        this.previousplaylist = tracks.filter((val: track) => val.book_id == this.activeTrack.book_id && val.chapter_id == chapter_id.toString());
        if (this.previousplaylist && this.previousplaylist.length > 0) {
          this.api.audiolistnext(this.previousplaylist);
          let trac = this.previousplaylist.length - 1;
          this.api.playnonext(trac)
          this.nextplaylist = []
        } else {
          this.api.showplayernext(false)
          this.close()
        }
      }//console.log(this.nextplaylist)
    }
    })
  }

  playnextchapter() {
    //console.log(this.nextplaylist)
    if (this.nextplaylist.length > 0) {
      this.api.audiolistnext(this.nextplaylist)
      this.api.playnonext(0)
      this.nextplaylist = []
    } else {
      this.close()
    }
  }

  repeat() {
    this.repeataudio = true;
  }

  async sharelink() {
    this.presentLoadingWithOptions();
    await Share.share({
      title: 'Islamin Audio Book',
      text: 'https://islamicaudiobooks.page.link/share',
      dialogTitle: 'Share with buddies'
    });
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      duration: 4000,
      message: 'Loading.',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async shareaudio(msg, img, url) {

    let ccc = "To listen more files from " + msg + " download Islamic Audio Books ";


    this.firebaseDynamicLinks.createShortDynamicLink({
      domainUriPrefix: "https://islamicaudiobooks.page.link/",
      link: "https://islamicaudiobooks.info/" + this.activeTrack.id,
      socialMetaTagInfo: {
        "socialTitle": "Islamic Audio Books - Listen Authentic Islamic Knowledge",
        "socialDescription": ccc,
      },
      "androidInfo": {
        "androidPackageName": "com.urduaudiobooks.urdutafsir",
      },
      "iosInfo": {
        "iosBundleId": 'com.islamicaudbooks.managix',
        "iosAppStoreId": '1512406926'
      }
    })
      .then(async (res: any) => {
        await Share.share({
          title: 'Islamin Audio Book',
          text: ccc + res,//'Download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info to listen to free Islamic Audio Books',
          dialogTitle: 'Share with buddies'
        });

      })


    //  let ccc = "To listen more files from " + msg + " download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info " + url
    this.presentLoadingWithOptions();
    //await this.socialSharing.share(ccc, 'Islamic Audio Book')
    /* await Share.share({
       title: 'Islamin Audio Book',
       text: ccc,//'Download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info to listen to free Islamic Audio Books',
       dialogTitle: 'Share with buddies'
     });*/

  }

  /////////////////////////////////////
  async processaudiodate(alltracks) {

    await Storage.get({key:'allbooks'}).then(async (val) => {

      if(val.value)
      {
        let list = JSON.parse(val.value);
      const result = alltracks.map(function (el) {
        var e = Object.assign({}, el);
        var element = list.filter(vv => vv.id == el.book_id, el);
        e.booksynopsysenglish = element[0].synopsys;
        e.booksynopsysurdu = element[0].synopsysurdu;
        e.bookdetailsenglish = element[0].details;
        e.bookdetailsurdu = element[0].detailsurdu;
        return e;
      }, list)
      await Storage.set({key:'allaudios', value: JSON.stringify(result)});
    }
    })
  }
  ///////////
  topicimage: string = '';
 async topicimg() {
    let bb = this.activeTrack.topic;
    if (bb != "") {
      await Storage.get({key:'alltopic'}).then((val) => {
        if(val.value)
        { let list = JSON.parse(val.value);
        let hh = list.find(e => e.id == bb);
        this.topicimage = hh?.logo;
        }
      })
    }
  }
  preloadoudio() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (this.nexttrackId < this.playlist.length) {
      var tt = this.playlist[index + 1];
      var aud = new Audio(tt.url)
      aud.preload;
    }

  }
  //////////////////// add to fab ////////////


 async addfavouriteAudio(track: track) {
    let favourit = []
    await Storage.get({key:'favourite'}).then(async (list) => {
      if(list.value)
      {
        let val = JSON.parse(list.value);
      if (val && Array.isArray(val) && val.length > 0) {
        //console.log(typeof val)
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
          favourit.push(track)
          await Storage.set({key:'favourite', value: JSON.stringify([favourit])}).then(() => { this.ckfeb(track) })
        }
        else {
          await Storage.set({key:'favourite', value: JSON.stringify([track])}).then(() => { this.ckfeb(track) })
        }
      }
      else {
        await Storage.set({key:'favourite', value: JSON.stringify([track])}).then(() => { this.ckfeb(track) })
      }
    }else{
      await Storage.set({key:'favourite', value: JSON.stringify([track])}).then(() => { this.ckfeb(track) })
    }
    })
  }

 async ckfeb(track) {
    // alert("ok")
    await Storage.get({key:'favourite'}).then((value) => {
      if (value.value) {
        let val = JSON.parse(value.value);
        const filteredPeople = val.filter((item) => item.id == track.id);
        if (filteredPeople.length > 0) {
          this.activeTrack.fav = true
        } else {
          this.activeTrack.fav = false
        }
      }
    })

  }

  createControls1() {
    /*CapacitorMusicControls.create({
      album: 'Islamic Audio Books',     // optional, default: ''
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //			 or a remote url ('http://...', 'https://...', 'ftp://...')
      hasClose: true,		// show close button, optional, default: false

      track: this.activeTrack.audioname,
      artist: this.activeTrack.chapter,
      cover: 'https://islamicaudiobooks.info/audioapp/assets/upload/dd.jpeg',
      hasPrev: true,
      hasNext: true,


      // iOS only, optional
      duration: 60, // optional, default: 0
      elapsed: 10, // optional, default: 0
      hasSkipForward: true, //optional, default: false. true value overrides hasNext.
      hasSkipBackward: true, //optional, default: false. true value overrides hasPrev.
      skipForwardInterval: 15, //optional. default: 15.
      skipBackwardInterval: 15, //optional. default: 15.
      hasScrubbing: false, //optional. default to false. Enable scrubbing from control center progress bar

      // Android only, optional
      isPlaying: true,							// optional, default : true
      dismissable: true,							// optional, default : false
      // text displayed in the status bar when the notification (and the ticker) are updated
      ticker: 'Now playing "Time is Running Out"',
      //All icons default to their built-in android equivalents
      //The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      notificationIcon: 'notification'
    }, onSuccess, onError);

    var onSuccess = function () {
      //alert('success')
    }
    var onError = function () {
      //alert("error")
    }



    CapacitorMusicControls.updateIsPlaying({
      isPlaying: true, // affects Android only
    });

    CapacitorMusicControls.addListener('controlsNotification', (info: any) => {
      console.log('controlsNotification was fired');
      console.log(info);
      this.handleControlsEvent(info);
    });*/
  }

  notificationCall = false;

  handleControlsEvent(action) {

    const message = action.message;
    if (!this.notificationCall) {
      this.notificationCall = true;
      // alert(this.notificationCall)
      switch (message) {
        case 'music-controls-next':
          this.next();
          this.settimeeout()
          break;
        case 'music-controls-previous':
          this.previous();
          this.settimeeout()
          break;
        case 'music-controls-pause':
          this.togglePlayer(true);
          this.settimeeout()
          break;
        case 'music-controls-play':
          this.togglePlayer(false);
          this.settimeeout()
          break;
        // Headset events (Android only)
        // All media button events are listed below
        case 'music-controls-media-button':
          // Do something
          break;
        case 'music-controls-headset-unplugged':
          // Do something
          break;
        case 'music-controls-headset-plugged':
          // Do something
          break;
        default:
          break;
      }
    }
  }

  settimeeout() {
    setTimeout(() => {
      this.notificationCall = false;
    }, 600);
  }


  /// tracking played Audio
 async storepayaudio(id) {
    await Storage.get({key:"storedaudio"}).then(async (val) => {
      if (val.value) {
        let list = JSON.parse(val.value);
        list.push(id);
        var unique = list.filter((v, i, a) => a.indexOf(v) === i);
        await Storage.set({key:"storedaudio", value: JSON.stringify(unique)})
      } else {
        await Storage.set({key:"storedaudio", value: JSON.stringify([id])})
      }
    })
  }



  ///////////////////////


  async deviceOrient() {
    this.deviceOrientation.watchHeading().subscribe((res: DeviceOrientationCompassHeading) => {
      this.data = res;
      // Change qiblaLocation when currentLocation is not empty
      if (!!this.currentLocation) {
        const currentQibla = res.magneticHeading - this.getQiblaPosition();
        this.qiblaLocation = currentQibla > 360 ? currentQibla % 360 : currentQibla;
        this._api.qublaLocationNext(this.qiblaLocation * -1);
      } else {
        this.devicekCurrentLocation();
      }
    });
    // Watch current location
  }
  async devicekCurrentLocation() {
    this.currentLocation = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 1000
    })
  }
  getQiblaPosition() {
    this._api.currentLocationLatNext(this.currentLocation.coords.latitude);
    this._api.currentLocationLongNext(this.currentLocation.coords.longitude);
    // Convert all geopoint degree to radian before jump to furmula
    const currentLocationLat = this.degreeToRadian(this.currentLocation.coords.latitude);
    const currentLocationLng = this.degreeToRadian(this.currentLocation.coords.longitude);
    const kaabaLocationLat = this.degreeToRadian(this.kaabaLocation.lat);
    const kaabaLocationLng = this.degreeToRadian(this.kaabaLocation.lng);

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    // Use Basic Spherical Trigonometric Formula
    return this.radianToDegree(
      Math.atan2(
        Math.sin(kaabaLocationLng - currentLocationLng),
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

 async viewContent(){
    const modal = await this.modalController.create({
      component: AudioContentPage,
      backdropDismiss : true,
      swipeToClose: true,
      cssClass:"filterModal",
      componentProps  : {audio:this.activeTrack}

    });
     await modal.present();

  }
  async currentPrayerTiming()
  {
    this.timings = null;
    const method = localStorage.getItem('method')?localStorage.getItem('method'):4;
    const d = new Date();
    this._api.prayerTime({latitude:this._api.currentLocationLat.value?this._api.currentLocationLat.value:23.5195,longitude:this._api.currentLocationLong.value?this._api.currentLocationLong.value:91.6542,method:method?method:4,month:d.getMonth()+1,year:d.getFullYear()}).subscribe(res=>{
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
    this._api.todayTimingsNext(rr.timings)
   }

}


