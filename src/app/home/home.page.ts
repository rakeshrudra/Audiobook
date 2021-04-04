import { Component, OnInit, ViewChild, PipeTransform, Pipe } from '@angular/core';
import { Howl, Howler } from 'howler';
import { IonRange } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { track } from '../model/track';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { Router } from '@angular/router';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showplayer: boolean = false;
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

  ////
  isloading: boolean = false;

  //constructor(public api: ApiService, public router: Router, public storage: Storage, public musicControls: MusicControls) {
  //  constructor(public api: ApiService, private androidPermissions: AndroidPermissions ){
      constructor(public api: ApiService ){
    api.audiolist.subscribe((val : track[]) => {
      this.playlist = val;
      if (val.length > 0) {
        if (this.palyer) {
          this.palyer.stop()
        }
        //this.start(val[this.api.playno.value])
      }
      //this.showplayer = true;
    })

    api.playno.subscribe(() => {
      api.audiolist.subscribe(val => {
        this.playlist = val;
        if (val.length > 0) {
          if (this.palyer) {
            this.palyer.stop()
          }
         // this.start(val[this.api.playno.value])
        }
       // this.showplayer = true;
      })
    })
    /// all books
 /*   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.FOREGROUND_SERVICE).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.FOREGROUND_SERVICE)
    );
  */

    ///
  }
}
