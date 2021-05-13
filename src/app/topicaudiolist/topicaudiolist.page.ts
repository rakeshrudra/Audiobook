import { NewapiService } from './../newapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { track } from '../model/track';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController, IonContent } from '@ionic/angular';
import { chapter } from '../model/chapter';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { topic } from '../model/topic';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { AutoloadService } from '../service/autoload.service';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';

const {Share} = Plugins;

import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-topicaudiolist',
  templateUrl: './topicaudiolist.page.html',
  styleUrls: ['./topicaudiolist.page.scss'],
})
export class TopicaudiolistPage implements OnInit {

  constructor(
    public _autoload : AutoloadService,
    private downloader: Downloader,public loadingController : LoadingController, public socialSharing : SocialSharing, public toastController : ToastController, public api : ApiService, public storage: Storage, public route : ActivatedRoute , public router : Router, public _api : NewapiService, private firebaseDynamicLinks : FirebaseDynamicLinks) {
      _autoload.activetrack.subscribe(val=>{
        _autoload.activetrack.subscribe(val=>{
        this.ckfev();
      })
    })

  }
  data = null;
  jsonaudio = '/assets/audios.json';
  //playlist : track[] = this.route.snapshot.data['audios'];
  playlist : track[];// = this.route.snapshot.data['audios'];
  favourit = [];
  topic = this.route.snapshot.paramMap.get('id');
  topicdata : topic;
  defaultImage = '/assets/loader.gif';

  ngOnInit() {
  }
  ionViewWillEnter(){

   // sudo ln -s /etc/nginx/sites-available/admin.restaurant.twerlo.com /etc/nginx/sites-enabled/admin.restaurant.twerlo.com

    this.dqlist();
    this.ckfev();
   // this.jsonaudiofun()
       /* this.storage.get('allaudios').then((values:track[])=>{
          if(values)
          {
          this.playlist = values.filter(list => list.topic === this.topic )
          }
        }).then(()=>{
          this.ckfev();
          this.jsonaudiofun()
        })  */

        this.storage.get('alltopic').then((values:topic[])=>{
          if(values)
          {
            this.topicdata = values.filter(list => list.id === this.topic )[0]
          }
       })

       this._api.audio("?topic="+this.topic).subscribe(val=>{
         this.playlist = val;
       })
       setInterval(v=>{
        this.get_storedlist()
      },2000)
  }

  jsonaudiofun()
  {
    if(this.playlist.length < 1)
    {
    this.api.localaudio().subscribe(values=>{
      this.playlist = values.filter(list => list.topic === this.topic )
    })
   }
  }
  downloadQlist = []

  getindque(track) {
    if(this.downloadQlist)
    {
    const filteredPeople = this.downloadQlist.filter((item) => item.id === track.id);
    ////console.log(track.id, filteredPeople, 'okl')
    if (filteredPeople.length > 0) {
      return true;
    } else {
      return false;
    }
   }

  }

  addfavouriteAudio(track : track)
  {
    this.storage.get('favourite').then((val : track[]) =>{
      if(Array.isArray(val))
      {
      const filteredPeople = val.filter((item) => item.id != track.id);
      if(Array.isArray(filteredPeople))
        {
          this.favourit = filteredPeople;
          this.favourit.push(track)
          this.storage.set('favourite',this.favourit).then(()=>   { this.presentToast(); this.ckfev()})
        }
        else
        {
          this.storage.set('favourite',[track]).then(()=> { this.presentToast(); this.ckfev()})
        }
      }
      else
      {
         this.storage.set('favourite',[track]).then(()=>   { this.presentToast(); this.ckfev()})
      }
    })
  }

  removefavouriteAudio(track)
  {
    this.storage.get('favourite').then((val : track[]) =>{
      if(Array.isArray(val))
      {
      const filteredPeople = val.filter((item) => item.id != track.id);
      if(Array.isArray(filteredPeople))
        {
          this.storage.set('favourite',filteredPeople).then(()=>   {  this.ckfev()})
        }
        else
        {
          this.storage.set('favourite',[]).then(()=> {  this.ckfev()})
        }
      }
      else
      {
         this.storage.set('favourite',[]).then(()=>   {  this.ckfev()})
      }
    })
  }

  play(data)
  {
    this.api.playnextchapternext(true)
    this.api.playnonext(data)
    this.api.audiolistnext(this.playlist)
    if(!this.api.showplayerinnext.value)
    {
    this.api.showplayernext(false)
    //this.router.navigate(['/tab/home/play'])
    }else
    {
      this.api.showplayernext(true)
    }
  }
  searchfocus()
  {
    this.router.navigate(['/tab/search'])
  }



  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Audio marked as favourite.',
      duration: 1500
    });
    toast.present();
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

  getColor(book:track)
  {
    return book.color;
  }

  ckfev() {
    this.downloadingck()
    this.storage.get('favourite').then((val: track[]) => {
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

  ///// downloading ck
  downloadingck() {
    this.downloadgck()

    this.storage.get('downloadq').then((val: track[]) => {
      if(val){
      if (Array.isArray(val)) {
        this.favourit = val
        for (var i = 0; i < this.playlist.length; i++) {
          if (val.filter(e => e.id === this.playlist[i].id).length > 0) {
            this.playlist[i].downloading = true;
          } else {
            this.playlist[i].downloading = false;
          }
        }
      }
    }
    })
  }
  ///// downloaded ck
  downloadgck() {
    this.storage.get('download').then((val: track[]) => {
      if(val){
      if (Array.isArray(val)) {
        this.favourit = val
        for (var i = 0; i < this.playlist.length; i++) {
          if (val.filter(e => e.id === this.playlist[i].id).length > 0) {
            this.playlist[i].downloaded = true;
          } else {
            this.playlist[i].downloaded = false;
          }
        }
      }
    }
    })
  }


  storehistory(track) {
    //console.log('down')
    //console.log(track)
    this.storage.get('download').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.push(track)
          this.storage.set('download', this.favourit)
          //console.log('down1')
          this.getindque(track)
          this.ckfev();
        }
        else
        {
          this.storage.set('download', [track])
          //console.log('down2')
          this.getindque(track)
          this.ckfev();
        }
      }
      else {
        //console.log('down3')
        this.storage.set('download', [track])
        this.getindque(track)
        this.ckfev();
      }
    })
  }

  downloadAll() {
    let track = this.playlist
    this.storage.get('downloadq').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val;
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.concat(track);
          let primes = this.favourit.concat(this.playlist);
         console.log(primes)
          this.storage.set('downloadq', primes).then(()=>{
            this.ckfev();
          })
        }
        else {
          this.storage.set('downloadq', track).then(()=>{
            this.ckfev();
          })
        }
      }
      else {
        this.storage.set('downloadq', track).then(()=>{
          this.ckfev();
        })
      }
    })
  }

  /// add in downloadq
  downloadQ(track: track) {
    this.storage.get('downloadq').then((val: track[]) => {
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.id != track.id);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.push(track)
          //console.log(this.favourit)
          this.storage.set('downloadq', this.favourit).then(() => {
            this.ckfev();
          })
        }
        else {
          this.storage.set('downloadq', [track]).then(() => {
            this.ckfev();
           })
        }
      }
      else {
        this.storage.set('downloadq', [track]).then(() => {
          this.ckfev();
        })
      }
    })
    this.api.downloadQstartnext(track.id);
    this.dqlist()
  }

  dqlist() {
    this.storage.get('downloadq').then((val: track[]) => {
      this.downloadQlist = val;
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
///

get_storedlist(){
  this.storage.get("storedaudio").then((val:Array<any>)=>{
    if(val)
    {
    this.storedid = val
    }
    else{
      this.storedid = []
    }
  })

}

async  shareaudio(msg, img, url,id) {

  let ccc = "To listen more files from " + msg + " download Islamic Audio Books ";


  this.firebaseDynamicLinks.createShortDynamicLink({
    domainUriPrefix: "https://islamicaudiobooks.page.link/",
    link: "https://islamicaudiobooks.info/"+id,
    socialMetaTagInfo: {
      "socialTitle": "Islamic Audio Books - Listen Authentic Islamic Knowledge",
      "socialDescription": ccc,
    },
    "androidInfo": {
      "androidPackageName": "com.urduaudiobooks.urdutafsir",
    }
})
.then(async (res: any) => {
  await Share.share({
    title: 'Islamin Audio Book',
    text:  res,//'Download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info to listen to free Islamic Audio Books',
    dialogTitle: 'Share with buddies'
  });

})




  }



}
