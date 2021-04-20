import { Injectable } from '@angular/core';
import { MediaObject, Media } from '@ionic-native/media/ngx';
import { track } from '../model/track';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx';
//import { DatePipe } from '@angular/common';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaynewmediaService {

  constructor(public media: Media, public storage: Storage, public file: File) { } //this.getposition()

  downloadPlaylist: track[] = [];

  downloadActiveTrack: track = null;

  downloadPlayer: MediaObject = null;

  downloadShowplayer = false;

  dounloadisloading = false;

  dounloadisplaying = false;

  downloadcurrenttrackno: number = 0;

  public duration: number = -1;

  public position: number = 0;

  get_position_interval;

  title = "";

  is_playing = new BehaviorSubject<boolean>(false);

  is_ready: boolean = false;

  is_in_play: boolean = false;

  get_duration_interval;

  files = [];

  selectandplay(i, tracks) {
    if (this.downloadPlayer) {
      this.is_in_play = true;
      this.is_playing.next(true);
      this.dounloadisloading = false;
      this.downloadPlayer.stop();
      this.downloadPlayer.release();
    }
    if (this.get_position_interval) {
      clearInterval(this.get_position_interval)
    }

    this.duration = -1;
    this.position = 0;
    this.dounloadisloading = true;
    this.downloadPlaylist = tracks;
    this.downloadShowplayer = true;
    this.play(tracks[i], i)
  }

  getposition() {
    setInterval(() => {
      //this.position = this.position+1;
    }, 100)
  }

  play(track, i) {
    this.download_start(track)
    this.downloadcurrenttrackno = i;
    console.log(i)
  }

  download_start(track) {

    if (this.downloadPlayer) {
      this.downloadPlayer.stop();
      this.downloadPlayer.release();
    }
    const f: FileEntry = track.location;
   var path ;
    if( track.downloadedurl){
      path = track.downloadedurl;//f.nativeURL.replace(/^file:\/\//, '');
    }else if(f){
      path = f.nativeURL.replace(/^file:\/\//, '');
    }
    this.downloadPlayer = this.media.create(path);
    this.downloadActiveTrack = track;
    this.downloadPlayer.play();
    this.title = track.audioname;
    this.dounloadisloading = false;
    this.playerstatus();
    this.durationofaudio();
   // this.getAndSetCurrentAudioPosition();
  }
  download_next() {
    let count = this.downloadcurrenttrackno;
    var no = count + 1;
    this.downloadcurrenttrackno = no;
    this.dounloadisloading = true;
    console.log(no, "next")
    this.duration = -1;
    this.position = 0;
    this.downloadPlayer.stop();
    this.downloadPlayer.release();
    console.log(no , this.downloadPlaylist.length , "ddownloadplaY")
    if (!this.downloadPlaylist || no >= this.downloadPlaylist.length) {
      this.download_close()
    }
    this.selectandplay(no, this.downloadPlaylist);
  }

  download_previous() {
    let count = this.downloadcurrenttrackno;
    var no = count - 1;
    this.downloadcurrenttrackno = no;
    console.log(no, "previous");
    this.duration = -1;
    this.position = 0;
    this.dounloadisloading = true;
    this.downloadPlayer.stop();
    this.downloadPlayer.release();
    this.selectandplay(no, this.downloadPlaylist);
    if (no < 0) {
      this.download_close()
    }
  }
  download_paush() {
    this.is_playing.next(true);
    this.dounloadisloading = false
    this.downloadPlayer.pause();
  }
  download_play() {
    this.is_playing.next(false);
    this.dounloadisloading = false
    this.downloadPlayer.play();
  }
  download_close() {
    if(this.downloadShowplayer)
    {
    this.downloadPlayer.stop()
    this.downloadPlayer.release();
    this.position = 0;
    this.duration = -1;
    this.downloadShowplayer = false;
    this.dounloadisloading = false;
    this.dounloadisplaying = false;
    this.downloadcurrenttrackno = 0;
    }
  }

  playerstatus() {
    //console.log('status checking started');
    this.downloadPlayer.onStatusUpdate.subscribe(status => {
      if (status == 2) {
        this.is_playing.next(true);
        console.log('started',this.is_playing.value);
      }
      if (status == 3) {
        this.is_playing.next(false);
        console.log('pause',this.is_playing.value);
      }

      if (status == 4 && (this.duration - 3) < this.position && this.duration > -1) {
        this.download_next()
      }
    })
  }

  /////////////////////


  durationofaudio() {
    this.duration = -1;
    this.getAndSetCurrentAudioPositionfun();
    var self = this;
    this.get_duration_interval = setInterval(function () {
      if (self.duration == -1) {
        self.duration = ~~self.downloadPlayer.getDuration(); // make it an integer
        this.is_playing.next(true);
      } else {
        clearInterval(self.get_duration_interval);
      }
    }, 100);
  }




  getAndSetCurrentAudioPositionfun() {
    let diff = 5;
    let self = this;
    this.get_position_interval = setInterval(() => {
      var last_position = this.position;
      self.downloadPlayer.getCurrentPosition().then((position) => {
        if (position >= 0 && position < self.duration) {
          //console.log(this.position);
          if (Math.abs(last_position - position) >= diff) {
            // set position
           this.position = last_position;
            self.downloadPlayer.seekTo(last_position * 1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (self.duration > 0 && position >= self.duration) {
          self.download_next();
          this.is_playing.next(false);
          this.dounloadisloading = true;
          clearInterval(this.get_position_interval)
        }
      });
    }, 100);
  }


  seek(val) {
    this.download_paush();
    let cc = val * 1000;
    //console.log(val)
    this.position = val;
    this.downloadPlayer.seekTo(val);
    this.download_play();
  }


}


