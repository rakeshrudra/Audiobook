import { Injectable } from '@angular/core';
import { track } from '../model/track';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { File } from '@ionic-native/file/ngx';

const MEDIA_FOLDER_NAME = 'audios';
@Injectable({
  providedIn: 'root'
})
export class AutoloadService {

  constructor(public file : File, public storage : Storage, public toastController : ToastController) { }

  activetrack = new BehaviorSubject<track>(null)


  deldownloadfile(track) {
    console.log("track",track)
    var myPath = track.url;
    if (track.url.indexOf('file://') < 0) {
      myPath = 'file://' + track.url;
    }
    let str = track.url.split("/");
    let newName = str.slice(-1).pop();

    const name = myPath.substr(myPath.lastIndexOf('/') + 1);

    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

    this.file.removeFile(copyTo, name).then(
      success => {
        track.location = success;
        console.log(track);
        track.url = "/" + MEDIA_FOLDER_NAME + '/' + newName;
        this.removedownloadAudio(track);
      },
      error => {
        console.log('Copy error: ', error);
        this.removedownloadAudio(track)
      }
    );
  }

  addfavouriteAudio(track: track) {
    let favourit = []
    this.storage.get('favourite').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
          favourit.push(track)
          this.storage.set('favourite', favourit).then(() => { this.presentToast();this.activetrack.next(track) })
        }
        else {
          this.storage.set('favourite', [track]).then(() => { this.presentToast();this.activetrack.next(track) })
        }
      }
      else {
        this.storage.set('favourite', [track]).then(() => { this.presentToast(); this.activetrack.next(track) })
      }
    })
  }

  removefavouriteAudio(track: track) {
    let favourit = []
    this.storage.get('favourite').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
         // favourit.push(track)
          this.storage.set('favourite', favourit).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })
        }
        else {
          this.storage.set('favourite', [track]).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })

        }
      }
      else {
        this.storage.set('favourite', [track]).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track)})

      }
    })
  }

  removehistoryAudio(track: track) {
    let favourit = []
    this.storage.get('history').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
         // favourit.push(track)
          this.storage.set('history', favourit).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })
        }
        else {
          this.storage.set('history', [track]).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })

        }
      }
      else {
        this.storage.set('history', [track]).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track)})

      }
    })
  }

  removedownloadAudio(track: track) {
    let favourit = []
    this.storage.get('download').then((val: track[]) => {
      if(val)
      {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
         // favourit.push(track)
          this.storage.set('download', favourit).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })

        }
        else {
          this.storage.set('download', [track]).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })
        }
      }
      else {
        this.storage.set('download', [track]).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track)})
      }
    }
    })
  }


  removedownloadqAudio(track: track) {
    let favourit = []
    this.storage.get('downloadq').then((val: track[]) => {
      if(val){
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
         // favourit.push(track)
          this.storage.set('downloadq', favourit).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })
        }
        else {
          this.storage.set('downloadq', [track]).then(() => { this.cpresentToast('Succesfully removed');  this.activetrack.next(track) })
        }
      }
      else {
        this.storage.set('downloadq', [track]).then(() => { this.cpresentToast('Succesfully removed');  this.activetrack.next(track) })
      }
      }
    })
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Audio marked as favourite.',
      duration: 1500
    });
    toast.present();
  }
  async cpresentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 1500
    });
    toast.present();
  }

}
