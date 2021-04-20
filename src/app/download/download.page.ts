import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
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
const MEDIA_FOLDER_NAME = 'audios';

@Component({
  selector: 'app-favourite',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {

  @ViewChild('range', { static: false }) range: IonRange;

  constructor(public api: ApiService, public modalCtrl: ModalController, public _downloadPlay: PlaynewmediaService, public storage: Storage, public file: File, public _autoload: AutoloadService) {
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

  ngOnInit() {
    this.loadFiles();
    this.storage.get('downloadq').then((val: track[]) => {
      if (val) {
        this.downloadPlaylistq = val;
        //console.log(val,"Qlist")
      }
    })
    this.findBook();
  }
  setinterval;
  ionViewDidEnter() {
    this.ngOnInit();
    this.selectedbook = null;
    this.selectedchapter = null;
    this.findBook();
      this.storage.get('chapters').then((book: chapter[]) => {
        if (book) {
          this.allchapters = book.filter(e => e.book_id === this.selectedbook);
        }
      })

      this.storage.get('download').then((book: track[]) => {
        if (book) {
          this.allaudios = book.filter(e => e.chapter_id === this.selectedchapter);
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

  loadFiles() {
    this.storage.get('download').then((val: track[]) => {
      if (val) {
        this.files = val;
        this.tempfiles = val;
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

  boookfilter() {
    this.storage.get('filter_book').then((val: string) => {
      //alert(val)
      console.log(this.tempfiles)
      if (val) {
        this.files = this.tempfiles.filter(e => e.book_id === val)
        console.log('book', this.files)
        this.showchapter = true;
        this.showtopic = false;
        this.chaptername = null;
        this.chapterfilter();

        this.storage.get('allbooks').then((book: book[]) => {
          if (book) {
            var vv = book.find(e => e.id === val);
            console.log(vv)
            this.bookname = vv.name;
          }
        })

      }
    })

  }

  chapterfilter() {
    this.storage.get('filter_chapter').then((val) => {
      if (val) {
        this.files = this.tempfiles.filter(e => e.chapter_id === val)
        console.log('chapter', this.files)


        this.storage.get('filter_topiccount').then((valc) => {
          if (valc != '0') {
            this.showtopic = true;
          } else {
            this.showtopic = false;
          }
          this.subchaptername = null;
          this.topicfilter()
        })
        this.topicfilter()
        this.storage.get('chapters').then((book: chapter[]) => {
          if (book) {

            var vv = book.find(e => e.id === val)
            console.log(vv)
            this.chaptername = vv.chapter;
            console.log(this.chaptername)
          }
        })

      }
    })
  }
  topicfilter() {
    this.storage.get('filter_topic').then((val) => {
      if (val) {
        this.files = this.tempfiles.filter(e => e.topic === val)
        console.log('topic', this.files)
        // this.showtopic = true;
        this.storage.get('alltopic').then((book: topic[]) => {
          if (book) {
            var vv = book.find(e => e.id === val)
            console.log(vv)

            this.subchaptername = vv.topic;
          }
        })

      }
    })

  }

  clearfilter() {
    this.storage.remove('filter_book').then(() => {
      this.ngOnInit();
      this.bookname = null
    });

    this.storage.remove('filter_chapter').then(() => {
      this.ngOnInit();
      this.chaptername = null
    });

    this.storage.remove('filter_topic').then(() => {
      this.ngOnInit();
      this.subchaptername = null
    });
  }



  ////   book chapter accrodian

  selectedbook;
  selectedchapter;
  allaudiolist;



  findBook() {
    this.storage.get('download').then((book: track[]) => {
      if (book) {
        this.allaudiolist = book;//.filter(e => e.chapter_id === i);
      }
    }).then(()=>{

    this.storage.get('allbooks').then(val => {
      if (val) {
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

  findChapter(i) {
    if(this.selectedbook == i)
    {
      this.selectedbook = null;
    }else{
    this.selectedbook = i;

    this.storage.get('chapters').then((book: chapter[]) => {
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
    })
  }

  }
  findaudios(i) {
    if(this.selectedchapter == i)
    {
      this.selectedchapter = null;
    }else{
    this.selectedchapter = i;

    this.storage.get('download').then((book: track[]) => {
      if (book) {
        this.allaudios = book.filter(e => e.chapter_id === i);
      }
    })
  }
  }
  removeaudiofromq(f){
    this.allaudios = this.allaudios.filter((item) => item.id !== f.id);  //ES6

    this.storage.get('download').then((book: track[]) => {
      if (book) {
       var vv = book.filter(e => e.id !== f.id);
       this.storage.set('downloa',vv);
      }
    }).then(()=>{
    this.findBook();
    this.findChapter(this.selectedbook)
  })

  }

}
