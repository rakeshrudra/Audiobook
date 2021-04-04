import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { track } from './model/track';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
const MEDIA_FOLDER_NAME = 'audios'
@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor( public storage : Storage, public transfer : FileTransfer, public file : File) { 
  }
  start()
  {
    setInterval(() => {
      console.log('download triger');
      this.qdownload()
    }, 10000);
  }
  set_interval;
  downloadingStatus : boolean = false;
  favourit;
  qdownload() {
    this.storage.get('downloadq').then((val: track[]) => {
      if (val) {
        if(!this.downloadingStatus)
        {
        console.log(val[0], 'download Started');
        this.download(val[0])
        }
      } else {
        //clearInterval(this.set_interval)
      }
    })
  }

  download(a) {
    this.downloadingStatus = true;
    a.download = 1;
    let str = a.url.split("/");
    let vv = str.slice(-1).pop();
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = a.url;
    fileTransfer.download(url, this.file.dataDirectory + vv).then((entry) => {
      // alert('download complete: ' + entry.toURL());
      this.copyfile(a, entry.toURL())
    }, (error) => {
      //this.downloadingStatus = false;
      console.log("Download Error",error);
    });
  }

  copyfile(track, fullPath) {
    console.log('copy now to ' + fullPath)
    var myPath = fullPath;
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }
    const ext = myPath.split('.').pop();
    const d = Date.now();
    let str = track.url.split("/");
    let newName = str.slice(-1).pop();

    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

    this.file.copyFile(copyFrom, name, copyTo, newName).then(
      success => {
        track.location = success;
        console.log("CopySuccess");
        track.url = "/" + MEDIA_FOLDER_NAME + '/' + newName;
        this.storedownloadhistort(track);
      },
      error => {
        console.log('Copy error: ', error);
        this.downloadingStatus = false;
      }
    );
  }

  storedownloadhistort(track) {
    console.log('down')
    console.log(track)
    this.storage.get('download').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.push(track)
          this.storage.set('download', this.favourit)
          console.log('Store Success 1')
          this.removefromdownloadQ(track);
        }
        else {
          this.storage.set('download', [track])
          console.log('Store Success 2')
          this.removefromdownloadQ(track);
        }
      }
      else {
        this.storage.set('download', [track])
        console.log('Store Success 3')
        this.removefromdownloadQ(track);
      }
    })
  }

  removefromdownloadQ(track: track) {
    this.storage.get('downloadq').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        console.log(track, filteredPeople);
        if (Array.isArray(filteredPeople)) {
          this.storage.set('downloadq', filteredPeople).then(() => { })
          console.log("Removed")
          this.downloadingStatus = false;
        }
        else {
          this.storage.set('downloadq', []).then(() => { })
          this.downloadingStatus = false;
        }
      }
      else {
        this.storage.set('downloadq', []).then(() => { })
        this.downloadingStatus = false;
      }
    })
  }


}
