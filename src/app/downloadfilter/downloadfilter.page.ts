import { Component, OnInit } from '@angular/core';

import { book } from '../model/book';
import { chapter } from '../model/chapter';
import { ModalController } from '@ionic/angular';
import { DownloadfilterPageModule } from './downloadfilter.module';
import { DownloadchapterfilterPage } from '../downloadchapterfilter/downloadchapterfilter.page';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-downloadfilter',
  templateUrl: './downloadfilter.page.html',
  styleUrls: ['./downloadfilter.page.scss'],
})
export class DownloadfilterPage implements OnInit {

  constructor( public modalCtrl : ModalController) { }

  books : book[] = [];
  chapters : chapter[] = [];

 async ngOnInit() {
  await Storage.get({key:'allbooks'}).then((val)=>{
    this.books = JSON.parse(val.value);
 })
 await Storage.get({key:'chapters'}).then((val)=>{
  this.chapters = JSON.parse(val.value);
})
}
async presentModal(id) {
 await Storage.set({key:'filter_book',value:id}).then(async ()=>{
  await Storage.remove({key:'filter_chapter'});
  await Storage.remove({key:'filter_topic'});
  await Storage.remove({key:'filter_topiccount'});

 }).then(()=>{
  this.modalCtrl.dismiss({
    book_id : id
  })
})


}


}
