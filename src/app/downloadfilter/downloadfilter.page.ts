import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { book } from '../model/book';
import { chapter } from '../model/chapter';
import { ModalController } from '@ionic/angular';
import { DownloadfilterPageModule } from './downloadfilter.module';
import { DownloadchapterfilterPage } from '../downloadchapterfilter/downloadchapterfilter.page';

@Component({
  selector: 'app-downloadfilter',
  templateUrl: './downloadfilter.page.html',
  styleUrls: ['./downloadfilter.page.scss'],
})
export class DownloadfilterPage implements OnInit {

  constructor( public modalCtrl : ModalController, public storag : Storage) { }

  books : book[] = [];
  chapters : chapter[] = [];

  ngOnInit() {
    this.storag.get('allbooks').then((val : book[])=>{
      this.books = val;
   })
   this.storag.get('chapters').then((val : chapter[])=>{
    this.chapters = val;
 })
}
async presentModal(id) {
 this.storag.set('filter_book',id).then(()=>{
  this.storag.remove('filter_chapter'); 
  this.storag.remove('filter_topic'); 
  this.storag.remove('filter_topiccount'); 
  
 }).then(()=>{
  this.modalCtrl.dismiss({
    book_id : id
  })
})


}


}
