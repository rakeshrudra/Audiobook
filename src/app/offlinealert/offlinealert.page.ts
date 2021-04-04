import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { track } from '../model/track';

@Component({
  selector: 'app-offlinealert',
  templateUrl: './offlinealert.page.html',
  styleUrls: ['./offlinealert.page.scss'],
})
export class OfflinealertPage implements OnInit {

  constructor(public modalCtrl : ModalController, public storage : Storage) { }

  offlinebutton = false;
  ngOnInit() {
    this.storage.get('download').then((val: track[])=>{
      if(val)
      {
        this.offlinebutton  = true
      }
    })
  }
  offline()
  {
     this.modalCtrl.dismiss({offline : true})
  }
}
