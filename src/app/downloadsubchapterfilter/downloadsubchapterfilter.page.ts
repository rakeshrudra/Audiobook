import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { topic } from '../model/topic';
import { ModalController } from '@ionic/angular';
import { track } from '../model/track';

@Component({
  selector: 'app-downloadsubchapterfilter',
  templateUrl: './downloadsubchapterfilter.page.html',
  styleUrls: ['./downloadsubchapterfilter.page.scss'],
})
export class DownloadsubchapterfilterPage implements OnInit {

  constructor(public storag : Storage, public modalCtrl1 : ModalController) { 
    this.storag.get('filter_chapter').then((val)=>{
      this.chapter_id = val;
  })

  }
 chapter_id : string;
 topics : topic[] = [];
  ngOnInit() {
    this.storag.get('alltopic').then((topic : topic[])=>{
      var filteredPeople = topic.filter((downloadsq) => downloadsq.chapter_id == this.chapter_id);
      this.topics = filteredPeople
   })

  }

  audiocount()
  {
    this.storag.get('download').then((audio : track[])=>{
  
       for(var i =0; i < this.topics.length; i++)
       {
          var filteredPeople = audio.filter((downloadsq) => downloadsq.topic == this.topics[i].id);
          this.topics[i].audiocount =filteredPeople.length;
          this.topics[i].isChecked = false;
          
       }
    })
  
  
  }
  
   save (id)
  {
        this.storag.set('filter_topic',id).then(()=>{
          this.modalCtrl1.dismiss({topic : id})
        })
  }
  

}
