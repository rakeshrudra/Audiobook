import { Component, OnInit, Input } from '@angular/core';
import { chapter } from '../model/chapter';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { track } from '../model/track';
import { DownloadsubchapterfilterPage } from '../downloadsubchapterfilter/downloadsubchapterfilter.page';

@Component({
  selector: 'app-downloadchapterfilter',
  templateUrl: './downloadchapterfilter.page.html',
  styleUrls: ['./downloadchapterfilter.page.scss'],
})
export class DownloadchapterfilterPage implements OnInit {

  constructor( public modalCtrl : ModalController, public storag : Storage) {
    this.storag.get('filter_book').then((val)=>{
        this.book_id = val;
    })
   }

  chapters  = [];
  book_id ;

  ngOnInit() {
   this.storag.get('chapters').then((val : chapter[])=>{
     this.chapters = val.filter((b)=>b.book_id == this.book_id);
    this.audiocount();
 }) 
}
audiocount()
{
  this.storag.get('download').then((audio : track[])=>{

    if(audio)
    {
     for(var i =0; i < this.chapters.length; i++)
     {
        var filteredPeople = audio.filter((downloadsq) => downloadsq.chapter_id == this.chapters[i].id);
        this.chapters[i].audiocountd =filteredPeople.length;
        this.chapters[i].isChecked = false;
     }
    }
  })

}
async save (id,topic)
{
  this.storag.set('filter_topiccount', topic).then(()=>{
  })

  this.storag.set('filter_chapter', id).then(()=>{
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
