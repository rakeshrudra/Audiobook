/*import { Injectable } from '@angular/core';
import { MediaObject, Media } from '@ionic-native/media/ngx';
import { track } from '../model/track';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { FileTransferObject, FileTransfer  } from '@ionic-native/file-transfer/ngx';
//import { DatePipe } from '@angular/common';
import { Platform, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DownloadplayService {

  constructor(public media: Media, public storage: Storage, public file: File) {
  }
  downloadPlaylist: track[] = [];
  downloadActiveTrack: track = null;
  downloadPlayer: MediaObject = null;
  downloadShowplayer = false
  dounloadisloading = false;
  dounloadisplaying = false;
  downloadcurrenttrackno: number = 0;
  duration = 0;

  position = 0;

  files = []

  selectandplay(i)
  {
      this.storage.get('download').then((val:track[])=>{
        this.downloadPlaylist = val;
        this.play(val[i],i)
      })
  }

  getposition()
  {
    setInterval(()=>{

    },100)
  }

  play(no, i) {
    this.dounloadisloading = true;
    this.download_start(no)
    this.downloadcurrenttrackno = i;

  }

  downloadPlaylistq: track[] = []
  loadFiles() {
    this.storage.get('download').then((val: track[]) => {
      this.files = val;
    })
  }

  download_start(track) {

    if (this.downloadPlayer)
    {
      this.downloadPlayer.stop();
      this.downloadPlayer.release();
    }

    const f: FileEntry = track.location;
    const path = f.nativeURL.replace(/^file:\/\//, '');
    this.downloadPlayer = this.media.create(path);

    this.downloadActiveTrack = track;

    this.downloadPlayer.onStatusUpdate.subscribe(status => {
      if (status == 1) {
        console.log("loading")
        this.downloadShowplayer = true;
        this.dounloadisloading = false
      }
      if (status == 3) {
        console.log("error")
        this.downloadShowplayer = false;
      }
      if (status == 2) {
        console.log("start")
        this.downloadShowplayer = true;
        this.dounloadisloading = false
        this.dounloadisplaying = true;
        this.duration = this.downloadPlayer.getDuration();
      }

      if (status == 4) {
        console.log("end")
        this.download_next()
      }
    })
    this.downloadPlayer.play({ playAudioWhenScreenIsLocked: true });
  }
  download_next()
  {
    if (!this.dounloadisloading)
    {
      let count = this.downloadcurrenttrackno;
      var no = count + 1;
      this.downloadcurrenttrackno = no;
      this.dounloadisloading = true;
      this.download_start(this.downloadPlaylist[no]);
      if (no >= this.downloadPlaylist.length) {
        this.download_close()
      }
    }
  }
  download_previous() {
    if (!this.dounloadisloading) {
      let count = this.downloadcurrenttrackno;
      var no = count - 1;
      this.downloadcurrenttrackno = no;
      this.dounloadisloading = true;
      this.download_start(this.downloadPlaylist[no]);
      if (no < 0) {
        this.download_close()
      }
    }
  }
  download_paush() {
    this.dounloadisplaying = false;
    this.downloadPlayer.pause();
  }
  download_play() {
    this.dounloadisplaying = true;
    this.downloadPlayer.play();
  }
  download_close() {
    if (this.downloadPlayer) {
      this.downloadPlayer.stop()
      this.downloadPlayer.release();
      this.downloadShowplayer = false;
      this.dounloadisloading = false;
      this.dounloadisplaying = false;
      this.downloadShowplayer = false;
    }
    this.downloadShowplayer = true;
  }
/*



  title = 'I Have a Dream';
  filename = 'I_Have_a_Dream.mp3';
  curr_playing_file: MediaObject;
  storageDirectory: any;

  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;

  message: any;

  duration: any = -1;
  position: any = 0;
  downloadPlaylist: track[] = [];
  get_duration_interval: any;
  get_position_interval: any;
  showplayer : boolean = false;
  downloadcurrenttrackno : number = 0;
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
    private transfer: FileTransfer,
    private media: Media,
    public storage : Storage
  ) {

  }

  selectandplay(i)
  {
      this.storage.get('download').then((val:track[])=>{
        this.downloadPlaylist = val;
        this.downloadcurrenttrackno = i;
        this.showplayer = true;
        this.download_start(val[i]);
      })
  }

  downloadActiveTrack : track ;

  download_start(track) {

    if (this.curr_playing_file)
    {
      this.curr_playing_file.stop();
      this.curr_playing_file.release();
    }

    const f: FileEntry = track.location;
    const path = f.nativeURL.replace(/^file:\/\//, '');
    this.curr_playing_file = this.media.create(path);

    this.downloadActiveTrack = track;


    this.curr_playing_file.play();
    //this.curr_playing_file.setVolume(0.0); // you don't want users to notice that you are playing the file
    let self = this;
    this.get_duration_interval = setInterval(function() {
      if (self.duration == -1) {
        self.duration = ~~self.curr_playing_file.getDuration(); // make it an integer
      } else {
        self.curr_playing_file.stop();
        self.curr_playing_file.release();
        self.setRecordingToPlay();
        clearInterval(self.get_duration_interval);
      }
    }, 100);
  }

  download_next()
  {
      let count = this.downloadcurrenttrackno;
      var no = count + 1;
      this.downloadcurrenttrackno = no;
      this.is_playing = true;
      this.download_start(this.downloadPlaylist[no]);
      if (no >= this.downloadPlaylist.length) {
        this.download_close()
      }
  }
  download_previous() {
      let count = this.downloadcurrenttrackno;
      var no = count - 1;
      this.downloadcurrenttrackno = no;
      this.is_playing = true;
      this.download_start(this.downloadPlaylist[no]);
      if (no < 0) {
        this.download_close()
      }
  }

  download_close() {
    if (this.curr_playing_file) {
      this.curr_playing_file.stop()
      this.curr_playing_file.release();
      this.is_in_play = false;
      this.is_playing = false;
      this.showplayer = false;
    }
  }


  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function() {
      let last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then(position => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
          self.stopPlayRecording();
          self.setRecordingToPlay();
        }
      });
    }, 100);
  }

  setRecordingToPlay() {
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      // 2: playing
      // 3: pause
      // 4: stop
      this.message = status;
      switch (status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2: // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3: // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4: // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    });
    console.log('audio file set');
    this.message = 'audio file set';
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
  }

  playRecording() {
    this.curr_playing_file.play();
    this.toastCtrl
      .create({
        message: `Start playing from ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  pausePlayRecording() {
    this.curr_playing_file.pause();
    this.toastCtrl
      .create({
        message: `Paused at ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  stopPlayRecording() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }

  controlSeconds(action) {
    let step = 15;

    let number = this.position;
    switch (action) {
      case 'back':
        this.position = number < step ? 0.001 : number - step;
        this.toastCtrl
          .create({
            message: `Went back ${step} seconds`,
            duration: 2000
          })
          .then(toastEl => toastEl.present());
        break;
      case 'forward':
        this.position =
          number + step < this.duration ? number + step : this.duration;
        this.toastCtrl
          .create({
            message: `Went forward ${step} seconds`,
            duration: 2000
          })
          .then(toastEl => toastEl.present());
        break;
      default:
        break;
    }
  }

  fmtMSS(s) {
    return s*1000;

    /** The following has been replaced with Angular DatePipe */
    // // accepts seconds as Number or String. Returns m:ss
    // return (
    //   (s - // take value s and subtract (will try to convert String to Number)
    //     (s %= 60)) / // the new value of s, now holding the remainder of s divided by 60
    //     // (will also try to convert String to Number)
    //     60 + // and divide the resulting Number by 60
    //   // (can never result in a fractional value = no need for rounding)
    //   // to which we concatenate a String (converts the Number to String)
    //   // who's reference is chosen by the conditional operator:
    //   (9 < s // if    seconds is larger than 9
    //     ? ':' // then  we don't need to prepend a zero
    //     : ':0') + // else  we do need to prepend a zero
    //   s
    // ); // and we add Number s to the string (converting it to String as well)
  //}
//}


import { Injectable } from '@angular/core';
import { MediaObject, Media } from '@ionic-native/media/ngx';
import { track } from '../model/track';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { FileTransferObject, FileTransfer  } from '@ionic-native/file-transfer/ngx';
//import { DatePipe } from '@angular/common';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DownloadplayService {

  title = 'I Have a Dream';
  filename = 'I_Have_a_Dream.mp3';
  curr_playing_file: MediaObject;
  storageDirectory: any;

  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;

  message: any;

  duration: any = -1;
  position: any = 0;

  get_duration_interval: any;
  get_position_interval: any;

  downloadPlaylist: track[] = [];
  downloadActiveTrack: track = null;
  downloadcurrenttrackno: number = 0;
  showplayer : boolean = false;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
    private transfer: FileTransfer,
    private media: Media,
    private datePipe: DatePipe,
    public storage: Storage,
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if (this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      } else {
        this.storageDirectory = this.file.cacheDirectory;
      }
    });
  }

//// play after 3 sec
playafter()
{
  setTimeout(function() {
    console.log('Play After 3 sec')
    this.playaudio();
  },3000)
}

  resetplayer()
  {
    console.log('Reseting')
    this.duration = -1;
    this.position = 0;

  }

  selectandplay(i)
  {
    this.duration = -1;
    this.position = 0;

      this.storage.get('download').then((val:track[])=>{
        this.duration = -1;
        this.position = 0;
        this.downloadPlaylist = val;
        this.downloadcurrenttrackno = i;
        console.log('get Duration And SetToPlay')
        this.getDurationAndSetToPlay(val[i]);
      })
  }


  download_next()
  {
      let count = this.downloadcurrenttrackno;
      var no = count + 1;
      this.downloadcurrenttrackno = no;
      this.is_playing = true;
      this.duration = -1;
      this.position = 0;
      console.log('Next Audio')
      this.selectandplay(no);
      if (no >= this.downloadPlaylist.length) {
        this.download_close()
      }
  }
  download_previous() {
      let count = this.downloadcurrenttrackno;
      var no = count - 1;
      this.downloadcurrenttrackno = no;
      this.is_playing = true;
      this.duration = -1;
      this.position = 0;
      console.log('Prev Audio')
      this.selectandplay(no);
      if (no < 0) {
        this.download_close()
      }
  }
  download_close() {
    if (this.curr_playing_file) {
      this.curr_playing_file.stop()
      this.curr_playing_file.release();
      this.is_in_play = false;
      this.is_playing = false;
      this.showplayer = false;
    }
  }

  getDurationAndSetToPlay(track) {
    if (this.curr_playing_file)
    {
      this.curr_playing_file.stop();
      this.curr_playing_file.release();
    }
    const f: FileEntry = track.location;
    const path = f.nativeURL.replace(/^file:\/\//, '');
    let self = this;
    this.curr_playing_file = this.media.create(path);
    self.title = ""
    console.log('Audio Play For duration')

    this.curr_playing_file.play();
    this.curr_playing_file.setVolume(0.0); // you don't want users to notice that you are playing the file
    this.get_duration_interval = setInterval(function() {
      if (self.duration == -1) {
        console.log('Duration non integer')
        self.duration = ~~self.curr_playing_file.getDuration(); // make it an integer
      } else {
        console.log('Duration  integer')

        self.curr_playing_file.stop();
        self.curr_playing_file.release();
        self.setRecordingToPlay();
        self.title = track.audioname;
        console.log('Duration settime end')
        clearInterval(self.get_duration_interval);
      }
    }, 100);
  }

  getAndSetCurrentAudioPosition() {
    console.log('Position tracking')

    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function() {
      let last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then(position => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position);
            //self.position = Math.round(position);
            console.log('Position tracking',self.position)

          } else {
            // update position for display
            self.position = Math.round(position);
            console.log('Position tracking',self.position)

          }
        } else if (position >= self.duration) {
          console.log('Play end By duration end',self.position)

          self.stopPlayRecording();
          self.setRecordingToPlay();
        }
      });
    }, 50);
  }

  seekto(position)
  {
    this.position = position;
    this.curr_playing_file.seekTo(position);
  }

  setRecordingToPlay() {
    console.log('Play Start')
    this.playafter();
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      // 2: playing
      // 3: pause
      // 4: stop
      this.message = status;
      switch (status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2: // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3: // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4: // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    });
    console.log('audio file set');
    this.message = 'audio file set';
    this.is_ready = true;
    this.curr_playing_file.play();
    this.getAndSetCurrentAudioPosition();
  }

  playRecording() {
    console.log('Main playing')
    this.curr_playing_file.play();
    this.toastCtrl
      .create({
        message: `Start playing from ${this.position}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  playaudio() {
    this.curr_playing_file.play();
  }

  pausePlayRecording() {
    this.curr_playing_file.pause();
    this.toastCtrl
      .create({
        message: `Paused at ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  stopPlayRecording() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }

  controlSeconds(action) {
    let step = 15;

    let number = this.position;
    switch (action) {
      case 'back':
        this.position = number < step ? 0.001 : number - step;
        this.toastCtrl
          .create({
            message: `Went back ${step} seconds`,
            duration: 2000
          })
          .then(toastEl => toastEl.present());
        break;
      case 'forward':
        this.position =
          number + step < this.duration ? number + step : this.duration;
        this.toastCtrl
          .create({
            message: `Went forward ${step} seconds`,
            duration: 2000
          })
          .then(toastEl => toastEl.present());
        break;
      default:
        break;
    }
  }
  fmtMSS(s) {
    return Math.round(s);
  }
}


