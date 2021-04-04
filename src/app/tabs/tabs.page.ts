import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, LoadingController } from '@ionic/angular';

import { Howl, howler } from 'howler';
import { IonRange } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { track } from '../model/track';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { Router, NavigationStart, ActivatedRoute, Event } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { book } from '../model/book';
import { topic } from '../model/topic';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { promise } from 'protractor';
import { resolve } from 'url';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { DownloadService } from '../service/download.service';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AutoloadService } from '../service/autoload.service';
import { PlaynewmediaService } from '../service/playnewmedia.service';
import { NewapiService } from '../newapi.service';
const MEDIA_FOLDER_NAME = 'audios';
import { Plugins } from '@capacitor/core';
const { CapacitorMusicControls , Share } = Plugins;
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild('myTabs', { static: true }) myTabs: IonTabs;
  audiobcdata = [];
  downloadingStatus : boolean = false;

  searchready: boolean = false;
  ngOnInit() {
    this.storage.get('activeClass').then(val => {
      this.api.activeClassnext(val);

    })
 //   alert(this.api.activeClass.value)
  }
  change(val) {
    this.api.activeClassnext(val);
    this._api.activeClassnext(val);
    this.storage.set('activeClass', val)
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


  ///////////// dwnload ver

  downloadPlaylist: track[] = [];
  downloadActiveTrack: track = null;
  downloadPlayer: MediaObject = null;
  downloadShowplayer = false
  dounloadisloading = false;
  dounloadisplaying = false;
  downloadcurrenttrackno: number = 0

  isloading: boolean = false;

  constructor(private loadingController: LoadingController,
    private socialSharing: SocialSharing,
    public _router: ActivatedRoute,
    public api: ApiService,
    public _api: NewapiService,
    public router: Router,
    public storage: Storage,
    public musicControls: MusicControls,
    public file: File,
    public media: Media,
    public _downloadService: DownloadService,
    private transfer: FileTransfer,
    public _download : DownloadService,
    public _autoload : AutoloadService,
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
    this.storage.get('lastdate').then(lastdate=>{

    this._api.latestaudio('?lastdate='+lastdate).subscribe((val: track[]) => {
      if (val.length > 0) {

          this.storage.get('allaudios').then((e : track[]) => {
            var ff = e;
            for(var i =0; i < val.length; i++)
            {
               ff = ff.filter(e=>e.id != val[i].id);
             //this.storage.set('allaudios',ff)
            }
            var newar = ff.concat(val);
            this.storage.set('allaudios',newar).then(()=>{
              console.log(newar);
            })
            //this.router.navigate(['/tab'], { replaceUrl: true })
            // this.timmer()
         // }).then(() => {
            //this.api.isapiloadingnext(true);
            var date =new Date().toLocaleString();
            this.storage.set('lastdate', date)

          })
      }else
      {
        var date =new Date().toLocaleString();
        this.storage.set('lastdate', date)
      }
    })
  })
    ///


    this.router.events.subscribe((RouterEvent: Event) => {

      if (RouterEvent instanceof NavigationStart) {
        let url = RouterEvent.url.split('/');
        this.tab = url[2];
        //console.log(this.tab)
        this.api.showplayernext(false);
      }
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

        html5PoolSize : 100,
        onload: (e) => {
          console.log(e, "l")

          this.loader = true;
          this.duration = this.palyer.duration();
          this.disableButton = false;
          this.ctime = 0;
        },
        onstop: (e) => {
          console.log(e, "s")
        }
         ,onplayerror: function(e) {
          console.log(e)
          this.palyer.once('unlock', function() {
            this.palyer.play();
          });
        },
        onplay: (e) => {
          console.log(e, "p")
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
          this.storage.set('playlist', this.playlist);
          this.storage.set('lasttrack', this.activeTrack);
          let index = this.playlist.indexOf(this.activeTrack);
          this.nexttrackId = index + 1;
          console.log(this.palyer)
          this.preloadoudio();
          this.ckfeb(track)
        },
        onend: (e) => {
          console.log(e, "e")
          if (!this.repeataudio) {
            if(this.api.playnextchapter.value)
            {
            this.next()
            }else
            {
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
        this.storage.set('playnextid', index + 1)
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
        this.storage.set('playnextid', this.trackNo)

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
        this.storage.set('playnextid', index)
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
      CapacitorMusicControls.updateIsPlaying({
        isPlaying: false, // affects Android only
      });
      if(this.palyer.playing())
      {
      this.palyer.pause();
      }
     // console.log(this.palyer.pause(),'pause')
    } else {
      CapacitorMusicControls.updateIsPlaying({
        isPlaying: true, // affects Android only
      });
      if(!this.palyer.playing())
      {
      this.palyer.play();
      }
     // console.log(this.palyer.play(),'play');
    }
  }

  pause() {
    this.palyer.pause();
    //this.musicControls.updateIsPlaying(false);
    CapacitorMusicControls.updateIsPlaying({
      isPlaying: false, // affects Android only
    });
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
    CapacitorMusicControls.destroy();
    this.activeTrack = null
    //this.router.navigate(['/tab/home/'])
  }
  storehistory(track: track) {
    this.storage.get('history').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.push(track)
          this.storage.set('history', this.favourit)
        }
        else {
          this.storage.set('history', [track])
        }
      }
      else {
        this.storage.set('history', [track])
      }
    })
  }
  play(i) {
    if (this.palyer) {
      this.palyer.unload();
    }
    this.start(this.playlist[i])
    this.storage.set('playnextid', i)
  }
  playcurrent() {
    this.palyer.play();
    console.log('1')
    CapacitorMusicControls.updateIsPlaying({
      isPlaying: true, // affects Android only
    });
  }


  createControls1() {
    this.musicControls.create({
      track: this.activeTrack.audioname,
      artist: this.activeTrack.chapter,
      cover: 'https://islamicaudiobooks.info/audioapp/assets/upload/dd.jpeg',
      isPlaying: true,
      hasPrev: true,
      hasNext: true,
      dismissable: false,
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
  storebook(track) {
    this.storage.get('book').then(valc => {
      if (valc) {
        const filteredPeople = valc.filter((item) => item.id != track.book_id);
        const filteredPeople1 = valc.filter((item) => item.id == track.book_id);

        if (Array.isArray(filteredPeople1)) {
          if (filteredPeople1.length > 0) { } else {
            this.api.book(track).subscribe(val => {
              this.storage.set('book', val).then()
            })
          }
        } else {
          this.favourit = filteredPeople;
          //console.log(this.favourit,'3')
          this.api.book(track).subscribe(val => {
            this.favourit.push(val[0])
            this.storage.set('book', this.favourit).then(c => {
              this.favourit = [];
            })
          })
        }
      }
      else {
        this.api.book(track).subscribe(val => {
          //console.log(val,"4")
          this.storage.set('book', val).then()
        })
      }
    })
  }
  nextchapteraodios() {
    if (this.api.playno.value <= this.playlist.length) {
      this.storage.get('allaudios').then((tracks: track[]) => {
        let chapter_id = parseInt(this.activeTrack.chapter_id) + 1;
        this.nextplaylist = tracks.filter((val: track) => val.book_id == this.activeTrack.book_id && val.chapter_id == chapter_id.toString());
        //console.log(this.nextplaylist)
      })
    } else {
      this.close()
    }
  }


  previouschapteraodios() {
    //console.log(this.api.playno.value);
      this.storage.get('allaudios').then((tracks: track[]) => {
        if(this.activeTrack.topic !='')
        {
          let chapter_id = this.activeTrack.chapter_id;
          let topic_id = parseInt(this.activeTrack.topic) - 1;
          this.previousplaylist = tracks.filter((val: track) => val.book_id == this.activeTrack.book_id && val.topic == topic_id.toString() &&  val.chapter_id == chapter_id);
          if(this.previousplaylist && this.previousplaylist.length > 0)
          {
            this.api.audiolistnext(this.previousplaylist)
            let trac = this.previousplaylist.length - 1;
            this.api.playnonext(trac)
            this.nextplaylist = []

          }else
          {
            this.api.showplayernext(false)
            this.close()
          }
        }else
        {
          let chapter_id = parseInt(this.activeTrack.chapter_id) - 1;
          this.previousplaylist = tracks.filter((val: track) => val.book_id == this.activeTrack.book_id && val.chapter_id == chapter_id.toString());
          if(this.previousplaylist && this.previousplaylist.length > 0)
          {
            this.api.audiolistnext(this.previousplaylist);
            let trac = this.previousplaylist.length - 1;
            this.api.playnonext(trac)
            this.nextplaylist = []
          }else
          {
            this.api.showplayernext(false)
            this.close()
          }
        }//console.log(this.nextplaylist)
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
      link: "https://islamicaudiobooks.info/"+this.activeTrack.id,
      socialMetaTagInfo: {
        "socialTitle": "Islamic Audio Books - Listen Authentic Islamic Knowledge",
        "socialDescription": ccc,
      },
      "androidInfo": {
        "androidPackageName": "com.urduaudiobooks.urdutafsir",
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

    this.storage.get('allbooks').then((val: book[]) => {

      const result = alltracks.map(function (el) {
        var e = Object.assign({}, el);
        var element = val.filter(vv => vv.id == el.book_id, el);
        e.booksynopsysenglish = element[0].synopsys;
        e.booksynopsysurdu = element[0].synopsysurdu;
        e.bookdetailsenglish = element[0].details;
        e.bookdetailsurdu = element[0].detailsurdu;
        return e;
      }, val)
      this.storage.set('allaudios', result);
    })
  }
  ///////////
  topicimage: string = '';
  topicimg() {
    let bb = this.activeTrack.topic;
    if (bb != "") {
      this.storage.get('alltopic').then((val: topic[]) => {
        let hh = val.find(e => e.id == bb);
        this.topicimage = hh.logo;
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


  addfavouriteAudio(track: track) {
    let favourit = []
    this.storage.get('favourite').then((val) => {
      if (val && Array.isArray(val) && val.length > 0) {
        console.log(typeof val)
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
          favourit.push(track)
          this.storage.set('favourite', favourit).then(() => {  this.ckfeb(track) })
        }
        else {
          this.storage.set('favourite', [track]).then(() => {  this.ckfeb(track) })
        }
      }
      else {
        this.storage.set('favourite', [track]).then(() => {  this.ckfeb(track) })
      }
    })
  }

  ckfeb(track)
  {
   // alert("ok")
    this.storage.get('favourite').then((val: track[]) => {
      if(val){
      const filteredPeople = val.filter((item) => item.id == track.id);
      if(filteredPeople.length > 0)
      {
        this.activeTrack.fav = true
      }else
      {
        this.activeTrack.fav = false
      }
    }
    })

  }

  createControls()
  {
  CapacitorMusicControls.create({
    album       : 'Islamic Audio Books',     // optional, default: ''
    // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
    //			 or a remote url ('http://...', 'https://...', 'ftp://...')
    hasClose  : true,		// show close button, optional, default: false

    track: this.activeTrack.audioname,
    artist: this.activeTrack.chapter,
    cover: 'https://islamicaudiobooks.info/audioapp/assets/upload/dd.jpeg',
    hasPrev: true,
    hasNext: true,


    // iOS only, optional
    duration : 60, // optional, default: 0
    elapsed : 10, // optional, default: 0
      hasSkipForward : true, //optional, default: false. true value overrides hasNext.
      hasSkipBackward : true, //optional, default: false. true value overrides hasPrev.
      skipForwardInterval : 15, //optional. default: 15.
    skipBackwardInterval : 15, //optional. default: 15.
    hasScrubbing : false, //optional. default to false. Enable scrubbing from control center progress bar

      // Android only, optional
      isPlaying   : true,							// optional, default : true
      dismissable : false,							// optional, default : false
    // text displayed in the status bar when the notification (and the ticker) are updated
    ticker	  : 'Now playing "Time is Running Out"',
    //All icons default to their built-in android equivalents
    //The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
    playIcon: 'media_play',
    pauseIcon: 'media_pause',
    prevIcon: 'media_prev',
    nextIcon: 'media_next',
    notificationIcon: 'notification'
  }, onSuccess, onError);

  var onSuccess = function(){
    alert('success')
  }
  var onError = function(){
    alert("error")
  }



CapacitorMusicControls.updateIsPlaying({
  isPlaying: true, // affects Android only
});

CapacitorMusicControls.addListener('controlsNotification', (info: any) => {
  console.log('controlsNotification was fired');
  console.log(info);
  this.handleControlsEvent(info);
});
  }

  notificationCall = false;

handleControlsEvent(action){

console.log("hello from handleControlsEvent")
const message = action.message;
if(!this.notificationCall){
  this.notificationCall = true;
 // alert(this.notificationCall)
switch(message) {
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
  case 'music-controls-media-button' :
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

settimeeout(){
  setTimeout(() => {
    this.notificationCall = false;
  }, 600);
}

}
