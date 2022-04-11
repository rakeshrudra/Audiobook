import { NewapiService } from './../newapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { chapter } from '../model/chapter';
import { ActivatedRoute, Router } from '@angular/router';

import { book } from '../model/book';
import { ModalController, LoadingController, IonContent } from '@ionic/angular';
import { BookmodalPage } from '../bookmodal/bookmodal.page';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { track } from '../model/track';

import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';

import { Share } from '@capacitor/share';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements OnInit {

  constructor( public loadingController : LoadingController, public socialSharing : SocialSharing, public api : ApiService,public _api : NewapiService, public route : ActivatedRoute, public firebaseDynamicLinks : FirebaseDynamicLinks,
     public router : Router) {
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
   this._api.chapters('?book_id='+this.book_id).subscribe(val=>{
    this.playlist = val;
  })

  }
 async ionViewWillEnter(){
     this._api.book('?book_id='+this.book_id).subscribe(val=>{
        this.book = val[0]
     })
   await Storage.get({key:'allbooks'}).then((val)=>{
    if(val.value)
    {
      let values = JSON.parse(val.value);
      let books = values.filter(list => list.id === this.book_id )
      this.book = books[0];
      console.log(this.playlist)
    }
 })
this.get_storedlist();
}
async play(id)
{
    //const val = values.filter(list => list.book_id === this.book_id )
    await Storage.get({key:'allaudios'}).then((audios) => {
      if(audios.value)
      {
        let values = JSON.parse(audios.value);
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

 async shareaudioold(msg)
  {
    this.presentLoadingWithOptions();
    let ccc = "To listen to more chapters from "+msg+" download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info";
   await Share.share({
    title: 'Islamin Audio Book',
    text: ccc,
    dialogTitle: 'Share with buddies'
  });

  }


  async shareaudio(msg, id) {

      this.presentLoadingWithOptions();
      let ccc = "To listen to more  from "+msg+" click here";


    this.firebaseDynamicLinks.createShortDynamicLink({
      domainUriPrefix: "https://islamicaudiobooks.page.link/",
      link: "https://islamicaudiobooks.info/chapter/"+id,
      socialMetaTagInfo: {
        "socialTitle": "Islamic Audio Books - Listen Authentic Islamic Knowledge",
        "socialDescription": ccc,
      },
      "androidInfo": {
        "androidPackageName": "com.urduaudiobooks.urdutafsir",
      },
      "iosInfo": {
        "iosBundleId": 'com.islamicaudbooks.managix',
        "iosAppStoreId": '1512406926'
    }
  })
  .then(async (res: any) => {
    await Share.share({
      title: 'Islamin Audio Book',
      text: res,//'Download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info to listen to free Islamic Audio Books',
      dialogTitle: 'Share with buddies'
    });

  })


  }


  async sharebook(msg,id)
  {
    this.presentLoadingWithOptions();
    let ccc = "To listen to more  from "+msg+" click here ";
    this.firebaseDynamicLinks.createShortDynamicLink({
      domainUriPrefix: "https://islamicaudiobooks.page.link/",
      link: "https://islamicaudiobooks.info/book/"+id,
      socialMetaTagInfo: {
        "socialTitle": "Islamic Audio Books - Listen Authentic Islamic Knowledge ",
        "socialDescription": ccc,
      },
      "androidInfo": {
        "androidPackageName": "com.urduaudiobooks.urdutafsir",
      },
      "iosInfo": {
        "iosBundleId": 'com.islamicaudbooks.managix',
        "iosAppStoreId": '1512406926'
    }
  })
  .then(async (res: any) => {
    await Share.share({
      title: 'Islamin Audio Book',
      text:  res,
      dialogTitle: 'Share with buddies'
    });

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
///
storedid = [];
async get_storedlist(){
  await Storage.get({key:"storedaudio"}).then((val)=>{
    if(val.value)
    {
    this.storedid = JSON.parse(val.value);
    }
    else{
      this.storedid = []
    }
  })

}
checkstatusnew(alist:Array<any>){
  var v =alist.every(v => this.storedid.includes(v));
  return v;
}

}
