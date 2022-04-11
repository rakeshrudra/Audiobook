import { Component, OnInit, ViewChild } from '@angular/core';


import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Howl, howler } from 'howler';
import { track } from '../model/track';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { MediaObject, Media } from '@ionic-native/media/ngx';
import { DownloadService } from '../service/download.service';
import { IonRange, ModalController } from '@ionic/angular';
import { DownloadplayService } from '../service/downloadplay.service';
import { PlaynewmediaService } from '../service/playnewmedia.service';
import { AutoloadService } from '../service/autoload.service';
import { OfflinealertPage } from '../offlinealert/offlinealert.page';
import { DownloadfilterPage } from '../downloadfilter/downloadfilter.page';
import { DownloadchapterfilterPage } from '../downloadchapterfilter/downloadchapterfilter.page';
import { DownloadsubchapterfilterPage } from '../downloadsubchapterfilter/downloadsubchapterfilter.page';
import { book } from '../model/book';
import { chapter } from '../model/chapter';
import { topic } from '../model/topic';
import { Storage } from '@capacitor/storage';
const MEDIA_FOLDER_NAME = 'audios';


@Component({
  selector: 'app-favourite',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {

  @ViewChild('range', { static: false }) range: IonRange;

  constructor(public api: ApiService, public modalCtrl: ModalController, public _downloadPlay: PlaynewmediaService,  public file: File, public _autoload: AutoloadService) {
    _autoload.activetrack.subscribe(val => {
      _autoload.activetrack.subscribe(val => {
        this.ngOnInit();
      })
    })

  }
  files = [];
  tempfiles = [];
  showdownloads: boolean = true;
  showdownloading: boolean = false;
  load = 20;
  showchapter = false;
  showtopic = false;
  bookname: string = null;
  chaptername: string = null;
  subchaptername: string = null;
  allbooks: Array<book>;
  allchapters: Array<chapter>;
  allaudios : Array<track>;
  allaudiostemp : Array<track>=[];
  downloadedBookcount = 0;


  showdownloadsfun() {
    this.ngOnInit();
    this.showdownloads = true;
    this.showdownloading = false;
    this.ionViewDidEnter();
  }

  showdownloadingfun()
  {
    this.showdownloads = false;
    this.showdownloading = true;
  }

 async ngOnInit() {
    this.loadFiles();
    await Storage.get({key:'downloadq'}).then((val) => {
      if (val.value) {
        this.downloadPlaylistq = JSON.parse(val.value);
        //console.log(val,"Qlist")
      }
    })
    this.findBook();
  }
  setinterval;
 async ionViewDidEnter() {
    this.ngOnInit();
    this.selectedbook = null;
    this.selectedchapter = null;
    this.findBook();
      await Storage.get({key:'chapters'}).then((val) => {
        if(val.value)
        {
          let book = JSON.parse(val.value);
        if (book) {
          this.allchapters = book.filter(e => e.book_id === this.selectedbook);
        }
        }
      })

      await Storage.get({key:'download'}).then((val) => {
        if(val.value)
        {
          let book = JSON.parse(val.value);
        if (book) {
          this.allaudios = book.filter(e => e.chapter_id === this.selectedchapter);
        }
      }
      })



  }
  ionViewWillLeave(){
    clearInterval(this.setinterval)
  }
  play(i) {
    this.api.showplayernext(false);
    this._downloadPlay.selectandplay(i, this.files)
  }
  downloadPlaylistq: track[] = []

  async loadFiles() {
    await Storage.get({key:'download'}).then((val) => {
      if (val.value) {
        this.files = JSON.parse(val.value);
        this.tempfiles = JSON.parse(val.value);;
        this.boookfilter();
      }
    })
  }
  seekto(event) {
    // this._downloadPlay.seekto(this.range)
    console.log(event)
  }
  download_previous() {
    let count = this._downloadPlay.downloadcurrenttrackno;
    let b = count - 1;
    this._downloadPlay.download_previous()
  }

  download_next() {
    console.log('next press')
    let count = this._downloadPlay.downloadcurrenttrackno;
    let b = count + 1;
    this._downloadPlay.selectandplay(b, this.files)
  }
  download_play(i, files) {
    this.api.audiolistnext([])
    this._downloadPlay.selectandplay(i, files)
    //this._downloadPlay.download_play()
  }
  download_pause() {
    //this._downloadPlay.download_paush()
  }
  async presentModal() {

    const modal = await this.modalCtrl.create({
      cssClass: "modal-cssdownload",
      component: DownloadfilterPage
    });
    modal.onDidDismiss().then((data) => {
      this.boookfilter();
    })

    return await modal.present();
  }

  seek() {
    //this._downloadPlay.seek(this.range)
  }

  async openchaptermod() {
    //console.log(data)
    const modal1 = await this.modalCtrl.create({
      cssClass: "modal-cssdownload",
      //componentProps: data.data,
      component: DownloadchapterfilterPage
    });
    modal1.onDidDismiss().then((val) => {
      this.chapterfilter();
    })
    return await modal1.present();
  }

  async opensubchapter() {
    // console.log(data)
    const modal3 = await this.modalCtrl.create({
      cssClass: "modal-cssdownload",
      //componentProps: data.data,
      component: DownloadsubchapterfilterPage
    });
    modal3.onDidDismiss().then((val) => {
      this.ngOnInit();

      // this.opensubchapter(val)
    })

    return await modal3.present();
  }
  // filter by book

 async boookfilter() {
    await Storage.get({key:'filter_book'}).then(async (list) => {
      if(list.value)
      {
        let val = list.value;
      if (val) {
        this.files = this.tempfiles.filter(e => e.book_id === val)
        console.log('book', this.files)
        this.showchapter = true;
        this.showtopic = false;
        this.chaptername = null;
        this.chapterfilter();

        await Storage.get({key:'allbooks'}).then((books) => {
          if(books.value)
          {
            let book = JSON.parse(books.value);
          if (book) {
            var vv = book.find(e => e.id === val);
            console.log(vv)
            this.bookname = vv.name;
          }
        }
        })

      }
    }
    })

  }

 async chapterfilter() {
    await Storage.get({key:'filter_chapter'}).then(async (filterval) => {
      if (filterval.value) {
        let val = filterval.value;
        this.files = this.tempfiles.filter(e => e.chapter_id === val)

        await Storage.get({key:'filter_topiccount'}).then(async (valtop) => {
          if (valtop.value && valtop.value != '0') {
            this.showtopic = true;
          } else {
            this.showtopic = false;
          }
          this.subchaptername = null;
          this.topicfilter()
        })
        this.topicfilter()
        await Storage.get({key:'chapters'}).then((books) => {
          if(books.value)
          {
            let book = JSON.parse(books.value);
            var vv = book.find(e => e.id === val)
            console.log(vv)
            this.chaptername = vv.chapter;
            console.log(this.chaptername)
          }
        })

      }
    })
  }
 async topicfilter() {
    await Storage.get({key:'filter_topic'}).then(async (valFilter) => {
      if(valFilter.value)
      {
        let val = valFilter.value;
      if (val) {
        this.files = this.tempfiles.filter(e => e.topic === val)
        console.log('topic', this.files)
        // this.showtopic = true;
        await Storage.get({key:'alltopic'}).then((books) => {
          if(books.value)
          {
            let book = JSON.parse(books.value);
          if (book) {
            var vv = book.find(e => e.id === val)
            console.log(vv)

            this.subchaptername = vv.topic;
          }
        }
        })

      }
    }
    })

  }

 async clearfilter() {
    await Storage.remove({key:'filter_book'}).then(() => {
      this.ngOnInit();
      this.bookname = null
    });

    await Storage.remove({key:'filter_chapter'}).then(() => {
      this.ngOnInit();
      this.chaptername = null
    });

    await Storage.remove({key:'filter_topic'}).then(() => {
      this.ngOnInit();
      this.subchaptername = null
    });
  }



  ////   book chapter accrodian

  selectedbook;
  selectedchapter;
  allaudiolist;



 async findBook() {
   await Storage.get({key:'download'}).then((books) => {
     if(books.value)
     {
       let book = JSON.parse(books.value);
      if (book) {
        this.allaudiolist = book;//.filter(e => e.chapter_id === i);
      }
    }
    }).then(async()=>{

      await Storage.get({key:'allbooks'}).then(allbooks => {
      if (allbooks.value) {
        let val =JSON.parse(allbooks.value);
        this.allbooks = val;
        for(var i =0 ; i < this.allbooks.length ; i++){
           var vv = this.allaudiolist.filter(e => e.book_id === this.allbooks[i].id);
           this.allbooks[i].audiodownloaded = vv.length;
        }
      }

    }).then(v=>{
      this.downloadedBookcount = this.allbooks.filter(e=>e.audiodownloaded>0).length;
    })
  })
  }

 async  findChapter(i) {
    if(this.selectedbook == i)
    {
      this.selectedbook = null;
    }else{
    this.selectedbook = i;


    await Storage.get({key:'chapters'}).then((chapters) => {
      if(chapters.value)
      {
      let book = JSON.parse(chapters.value);
      if (book) {
        this.allchapters = book.filter(e => e.book_id === i);
        this.allchapters = this.allchapters.sort((a, b) => (a.chapterno < b.chapterno)?-1:1);

        for(var j =0 ; j < this.allchapters.length ; j++){
          var vv = [];
           vv = this.allaudiolist.filter(e => e.chapter_id === this.allchapters[j].id);
          this.allchapters[j].audiodownloaded = vv.length;
        }
       var bb = this.allaudiolist.filter(e => e.book_id === this.selectedbook);
       this.allaudiostemp = bb.sort((a,b)=> (a.slno < b.slno)?-1:1);//.sort((a, b) =>  a.chapter_id.localeCompare(b.chapter_id) && a.slno.localeCompare(b.slno) );
       this.allaudiostemp = this.allaudiostemp.sort((a,b)=> (a.chapter_id < b.chapter_id)?-1:1);//.sort((a, b) =>  a.chapter_id.localeCompare(b.chapter_id) && a.slno.localeCompare(b.slno) );
       console.log(this.allchapters)
      }
    }
    })
  }

  }
async  findaudios(i) {
    if(this.selectedchapter == i)
    {
      this.selectedchapter = null;
    }else{
    this.selectedchapter = i;

  await Storage.get({key:'download'}).then((download) => {
    if(download.value)
    {
      let book = JSON.parse(download.value);
      if (book) {
        this.allaudios = book.filter(e => e.chapter_id === i);
      }
    }
    })
  }
  // inside ngAfterViewInit() to make sure the list items render or inside ngAfterViewChecked() if you are anticipating live data using @Inputs
const itemToScrollTo = document.getElementById('item-' + i);
// null check to ensure that the element actually exists
if (itemToScrollTo) {
  itemToScrollTo.scrollIntoView(true);
}
  }
 async removeaudiofromq(f){
    this.allaudios = this.allaudios.filter((item) => item.id !== f.id);  //ES6

    await Storage.get({key:'download'}).then(async(books) => {
      if(books.value)
      {
        let book = JSON.parse(books.value);
      if (book) {
       var vv = book.filter(e => e.id !== f.id);
       await Storage.set({key:'downloa',value: JSON.stringify(vv)});
      }
    }
    }).then(()=>{
    this.findBook();
    this.findChapter(this.selectedbook)
  })

  }

}
