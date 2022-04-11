import { Injectable } from '@angular/core';
import { track } from '../model/track';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { File } from '@ionic-native/file/ngx';

const MEDIA_FOLDER_NAME = 'audios';

import { Storage } from '@capacitor/storage';
@Injectable({
  providedIn: 'root'
})
export class AutoloadService {

  constructor(public file : File, public toastController : ToastController) { }

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

  async addfavouriteAudio(track: track) {
    let favourit = []
    await Storage.get({key:'favourite'}).then(async (list) => {
      if(list.value)
      {
        let val = JSON.parse(list.value);
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
          favourit.push(track)
          await Storage.set({key:'favourite', value: JSON.stringify(favourit)}).then(() => { this.presentToast();this.activetrack.next(track) })
        }
        else {
          await Storage.set({key:'favourite', value: JSON.stringify([track])}).then(() => { this.presentToast();this.activetrack.next(track) })
        }
      }
      else {
        await Storage.set({key:'favourite', value: JSON.stringify([track])}).then(() => { this.presentToast(); this.activetrack.next(track) })
      }
    }
    })
  }

 async removefavouriteAudio(track: track) {
    let favourit = []
    await Storage.get({key:'favourite'}).then(async(list) => {
      if(list.value)
      {
        let val = JSON.parse(list.value);
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
         // favourit.push(track)

         await Storage.set({key:'favourite', value: JSON.stringify(favourit)}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })
        }
        else {
          await Storage.set({key:'favourite', value: JSON.stringify([track])}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })

        }
      }
      else {
        await Storage.set({key:'favourite', value:JSON.stringify([track])}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track)})

      }
    }
    })
  }

 async  removehistoryAudio(track: track) {
    let favourit = []
    await Storage.get({key:'history'}).then(async (list) => {
      if(list.value)
      {
        let val = JSON.parse(list.value);
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
         // favourit.push(track)
         await Storage.set({key:'downloadq', value: JSON.stringify(favourit)}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })
        }
        else {
          await Storage.set({key:'downloadq', value: JSON.stringify([track])}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })

        }
      }
      else {
        await Storage.set({key:'downloadq', value: JSON.stringify([track])}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track)})

      }
    }
    })
  }

 async removedownloadAudio(track: track) {
    let favourit = []
    await Storage.get({key:'downloadq'}).then(async (list) => {
      if(list.value)
      {
        let val = JSON.parse(list.value);
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
         // favourit.push(track)
         await Storage.set({key:'downloadq', value: JSON.stringify(favourit)}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })

        }
        else {
          await Storage.set({key:'downloadq', value: JSON.stringify([track])}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })
        }
      }
      else {
        await Storage.set({key:'downloadq', value: JSON.stringify([track])}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track)})
      }
    }
    })
  }


 async removedownloadqAudio(track: track) {
    let favourit = []
    await Storage.get({key:'downloadq'}).then(async (list) => {
      if(list.value)
      {
        let val = JSON.parse(list.value);
      if(val){
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          favourit = filteredPeople;
         // favourit.push(track)
         await Storage.set({key:'downloadq', value: JSON.stringify(favourit)}).then(() => { this.cpresentToast('Succesfully removed'); this.activetrack.next(track) })
        }
        else {
          await Storage.set({key:'downloadq', value: JSON.stringify([track])}).then(() => { this.cpresentToast('Succesfully removed');  this.activetrack.next(track) })
        }
      }
      else {
        await Storage.set({key:'downloadq', value: JSON.stringify([track])}).then(() => { this.cpresentToast('Succesfully removed');  this.activetrack.next(track) })
      }
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
