import { NewapiService } from './../newapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { chapter } from '../model/chapter';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { book } from '../model/book';
import { ModalController, LoadingController, IonContent } from '@ionic/angular';
import { BookmodalPage } from '../bookmodal/bookmodal.page';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { track } from '../model/track';
import { Plugins } from '@capacitor/core';
const { CapacitorMusicControls , Share } = Plugins;

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements OnInit {

  constructor( public loadingController : LoadingController, public socialSharing : SocialSharing, public api : ApiService,public _api : NewapiService, public route : ActivatedRoute,
    public storage : Storage, public router : Router) {
    this.book_id = route.snapshot.params.book;
  }
  playlist : Array<chapter>;// = this.route.snapshot.data['chapters'];
  book : book; //= this.route.snapshot.data['book'][0];
  book_id ;//= this.route.snapshot.paramMap.get('book');
  defaultImage = '/assets/loader.gif';
  defaultImage1 = '/assets/loader.gif';
  favourit;
  modalOpen : boolean = false;
  menu = 'chapters';
  jsonaudio = '/assets/audios.json';
  getColor(book:book)
  {
    return book.color;
  }
  int(a)
  {
    return parseInt(a)
  }

  ngOnInit() {
    /*this.storage.get('chapters').then((values:chapter[])=>{
      if(values)
      {
        this.playlist = values.filter(list => list.book_id === this.book_id )
        console.log(this.playlist)

      }
   })*/
  }
  ionViewWillEnter(){
     this._api.chapters('?book_id='+this.book_id).subscribe(val=>{
       this.playlist = val;
     })
     this._api.book('?book_id='+this.book_id).subscribe(val=>{
        this.book = val[0]
     })
   this.storage.get('allbooks').then((values:book[])=>{
    if(values)
    {
      let books = values.filter(list => list.id === this.book_id )
      this.book = books[0];
      console.log(this.playlist)
    }
 })

}
play(id)
{
    //const val = values.filter(list => list.book_id === this.book_id )
    this.storage.get('allaudios').then((values: track[]) => {
      if(values)
      {
    const val = values.filter(list => list.chapter_id === id );
    if(val.length > 0)
    {
    this.api.playnonext(0)
    this.api.audiolistnext(val)
    this.api.showplayernext(true)
    if(val.length > 0)
    {
    //this.router.navigate(['/tab/home/play'])
    }
   }else
   {
      this.jsonaudiofun(id)
   }
  }else
  {
    this.jsonaudiofun(id)
  }
  })

}

jsonaudiofun(id)
{
  if(this.playlist.length < 1)
  {
  this.api.localaudio().subscribe(values=>{
    const val = values.filter(list => list.chapter_id === id );
    this.api.playnonext(0)
    this.api.audiolistnext(val)
    this.api.showplayernext(true)
    if(val.length > 0)
    {
    //this.router.navigate(['/tab/home/play'])
    }

  })
 }
}


downloadall()
{

}

  segmentChanged(e)
  {
    this.menu =e;
  }
  details(e)
  {
    this.menu =e;
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      duration: 4000,
      message: 'Loading.',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

 async shareaudio(msg)
  {
    this.presentLoadingWithOptions();
    let ccc = "To listen to more chapters from "+msg+" download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info";
   await Share.share({
    title: 'Islamin Audio Book',
    text: ccc,
    dialogTitle: 'Share with buddies'
  });

  }

  sharebook(msg)
  {
    this.presentLoadingWithOptions();
    let ccc = "To listen to more  from "+msg+" download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info";
    this.socialSharing.share(ccc).then(()=>{

   })
  }
  @ViewChild(IonContent,{static: false}) ionContent: IonContent;
  showscrolltotop : boolean = false;
  scrollContent() {
      this.ionContent.scrollToTop(300); //300 for animate the scroll effect.
  }
  scroll(event)
  {
    if (event.detail.deltaY > 0) {
      this.showscrolltotop = true;
    } else {
      this.showscrolltotop = true;
    };
  }

}
