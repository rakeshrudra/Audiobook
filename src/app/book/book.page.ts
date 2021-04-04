import { NewapiService } from './../newapi.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { book } from '../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmodalPage } from '../bookmodal/bookmodal.page';
import { ModalController, ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {


  constructor(public toastController: ToastController,  public api: ApiService,public _api: NewapiService, public storage: Storage, public route: ActivatedRoute, public router: Router) {
   /* this.network.onConnect().subscribe(() => {
      this.api.books({ module: this.module }).subscribe(data => {
        this.playlist = data;
      })
    });*/
   /* this.storage.get('allbooks').then((values:book[])=>{
      if(values)
      {
        this.playlist = values.filter(list => list.modules.toLowerCase().indexOf(this.module.toLowerCase()) !== -1 )
        if(this.playlist.length == 1)
        {
          this.router.navigate(['/tab/home/chapter/',this.playlist[0].id])
        }
      }
   })*/

  }

  playlist: Array<book> = this.route.snapshot.data['books'];
  module = this.route.snapshot.paramMap.get('module');
  modalOpen = false;
  defaultImage = '/assets/loader.gif';
  favourit;
  details = 7;
  chapterslist = 4;

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.ckfev();
    this._api.books('?modules='+this.module).subscribe(val=>{
      this.playlist = val
    })
  }
  getColor(book:book)
  {
    return book.color;
  }
  chagewidth() {
    this.details = 9;
    this.chapterslist = 2;
  }
  chagecpterwidth() {
    this.details = 3;
    this.chapterslist = 8;
  }
  presentModal1(a)
  {}
  play(id)
  {

    this.api.audiofindchapter({chapter:id}).subscribe(val=>{
      this.api.playnonext(0)
      this.api.audiolistnext(val)
      if(val.length > 0)
      {
      this.router.navigate(['/tab/home/play'])
      }
    })
  }
  favourite(track) {
    this.storage.get('favouritebook').then(val => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.push(track)
          this.storage.set('favouritebook', this.favourit).then(() => { this.presentToast(); this.ckfev() })
        }
        else {
          this.storage.set('favouritebook', [track]).then(() => { this.presentToast(); this.ckfev() })
        }
      }
      else {
        this.storage.set('favouritebook', [track]).then(() => { this.presentToast(); this.ckfev() })
      }
    })
  }

  removefavourite(track) {
    this.storage.get('favouritebook').then(val => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.storage.set('favouritebook', this.favourit).then(() => { this.ckfev() })
        }
        else {
          this.storage.set('favouritebook', []).then(() => { this.ckfev() })
        }
      }
      else {
        this.storage.set('favouritebook', []).then(() => { this.ckfev() })
      }
    })
  }

  searchfocus() {
    this.router.navigate(['/tab/search'])
  }
  async ionViewWillLeave() {
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Book marked as favourite.',
      duration: 1500
    });
    toast.present();
  }
  ckfev() {
    this.storage.get('favouritebook').then(val => {
      if (Array.isArray(val)) {
        this.favourit = val
      for (var i = 0; i < this.playlist.length; i++) {
        if (val.filter(e => e.id === this.playlist[i].id).length > 0) {
          this.playlist[i].fav = true;
        } else {
          this.playlist[i].fav = false;
        }
      }
    }

    })
  }
}
