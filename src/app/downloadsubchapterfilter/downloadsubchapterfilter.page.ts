import { async } from '@angular/core/testing';
import { Component, OnInit, Input } from '@angular/core';

import { topic } from '../model/topic';
import { ModalController } from '@ionic/angular';
import { track } from '../model/track';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-downloadsubchapterfilter',
  templateUrl: './downloadsubchapterfilter.page.html',
  styleUrls: ['./downloadsubchapterfilter.page.scss'],
})
export class DownloadsubchapterfilterPage implements OnInit {

  constructor(public modalCtrl1 : ModalController) {

  }
 chapter_id : string;
 topics : topic[] = [];
 async ngOnInit() {
  await Storage.get({key:'filter_chapter'}).then((val)=>{
    this.chapter_id = val.value;
})

    await Storage.get({key:'alltopic'}).then((val)=>{
      if(val.value)
      {
        let topic = JSON.parse(val.value);
      var filteredPeople = topic.filter((downloadsq) => downloadsq.chapter_id == this.chapter_id);
      this.topics = filteredPeople
      }
   })

  }

async  audiocount()
  {
    await Storage.get({key:'download'}).then((audios)=>{

      if(audios.value)
      {
        let audio = JSON.parse(audios.value);
       for(var i =0; i < this.topics.length; i++)
       {

          var filteredPeople = audio.filter((downloadsq) => downloadsq.topic == this.topics[i].id);
          this.topics[i].audiocount =filteredPeople.length;
          this.topics[i].isChecked = false;

       }
      }
    })


  }

  async save (id)
  {
        await Storage.set({key:'filter_topic',value:id}).then(()=>{
          this.modalCtrl1.dismiss({topic : id})
        })
  }


}
