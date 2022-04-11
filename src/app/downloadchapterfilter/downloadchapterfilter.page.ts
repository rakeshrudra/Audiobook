import { Component, OnInit, Input } from '@angular/core';
import { chapter } from '../model/chapter';
import { ModalController } from '@ionic/angular';

import { track } from '../model/track';
import { DownloadsubchapterfilterPage } from '../downloadsubchapterfilter/downloadsubchapterfilter.page';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-downloadchapterfilter',
  templateUrl: './downloadchapterfilter.page.html',
  styleUrls: ['./downloadchapterfilter.page.scss'],
})
export class DownloadchapterfilterPage implements OnInit {

  constructor( public modalCtrl : ModalController) {
   }

  chapters  = [];
  book_id ;

 async ngOnInit() {
    await Storage.get({key:'filter_book'}).then((val)=>{
      this.book_id = val.value;
  })

  await Storage.get({key:'chapters'}).then((chapters)=>{
    if(chapters.value)
    {
      let val = JSON.parse(chapters.value);
     this.chapters = val.filter((b)=>b.book_id == this.book_id);
    this.audiocount();
    }
 })
}
async audiocount()
{
  await Storage.get({key:'download'}).then((audios)=>{

if(audios.value)
{
  let audio = JSON.parse(audios.value);
    if(audio)
    {
     for(var i =0; i < this.chapters.length; i++)
     {
        var filteredPeople = audio.filter((downloadsq) => downloadsq.chapter_id == this.chapters[i].id);
        this.chapters[i].audiocountd =filteredPeople.length;
        this.chapters[i].isChecked = false;
     }
    }
  }
  })

}
async save (id,topic)
{
  await Storage.set({key:'filter_topiccount', value: JSON.stringify(topic)}).then(()=>{
  })

  await Storage.set({key:'filter_chapter', value: id}).then(()=>{
    this.modalCtrl.dismiss({chapter_id: id})
  })

}

async opensubdatachaptermod(data)
{
    //alert(id)
    const modal = await this.modalCtrl.create({
      cssClass: "modal-cssdownload",
      componentProps: data,
      component: DownloadsubchapterfilterPage
    });
    modal.onDidDismiss().then(() => {
    }).then(()=>{
      this.closemodal()
    })
    return await modal.present();

}
closemodal()
{
  this.modalCtrl.dismiss()
}

}
