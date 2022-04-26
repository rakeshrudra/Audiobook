import { NewapiService } from './../newapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

import { track } from '../model/track';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController, IonContent } from '@ionic/angular';
import { chapter } from '../model/chapter';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { topic } from '../model/topic';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { AutoloadService } from '../service/autoload.service';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';

import { Share } from '@capacitor/share';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-topicaudiolist',
  templateUrl: './topicaudiolist.page.html',
  styleUrls: ['./topicaudiolist.page.scss'],
})
export class TopicaudiolistPage implements OnInit {

  constructor(
    public _autoload : AutoloadService,
    private downloader: Downloader,public loadingController : LoadingController, public socialSharing : SocialSharing, public toastController : ToastController, public api : ApiService, public route : ActivatedRoute , public router : Router, public _api : NewapiService, private firebaseDynamicLinks : FirebaseDynamicLinks) {
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
  async ionViewWillEnter(){

   // sudo ln -s /etc/nginx/sites-available/admin.restaurant.twerlo.com /etc/nginx/sites-enabled/admin.restaurant.twerlo.com

    this.dqlist();
    this.ckfev();

       this._api.audio("?topic="+this.topic).subscribe(val=>{
         this.playlist = val;
       })
       setInterval(v=>{
        this.get_storedlist()
      },2000)
  }

  jsonaudiofun()
  {
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

  async addfavouriteAudio(track: track) {
    await Storage.get({key:'favourite'}).then((tracks) => {
      if(tracks.value)
      {
        let val = JSON.parse(tracks.value);
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.push(track)
           Storage.set({key:'favourite', value: JSON.stringify(this.favourit)}).then(() => { this.presentToast(); this.ckfev() })
        }
        else {
           Storage.set({key:'favourite', value: JSON.stringify([track])}).then(() => { this.presentToast(); this.ckfev() })
        }
      }
      else {
         Storage.set({key:'favourite', value: JSON.stringify([track])}).then(() => { this.presentToast(); this.ckfev() })
      }
    }

    })
  }

 async  removefavouriteAudio(track) {
    await Storage.get({key:'favourite'}).then(async (traks) => {
      if(traks.value)
      {
        let val = JSON.parse(traks.value);
      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          await Storage.set({key:'favourite', value: JSON.stringify(filteredPeople)}).then(() => { this.ckfev() })
        }
        else {
          await Storage.set({key:'favourite', value: JSON.stringify([])}).then(() => { this.ckfev() })
        }
      }
      else {
        await Storage.set({key:'favourite', value: JSON.stringify([])}).then(() => { this.ckfev() })
      }
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

 async ckfev() {
    this.downloadingck()
    await Storage.get({key:'favourite'}).then(async (traks) => {
      if(traks.value)
      {
        let val = JSON.parse(traks.value);
      if (Array.isArray(val)) {
      this.favourit = val
      for (var i = 0; i < this.playlist.length; i++) {
        if (val.filter(e => e.url === this.playlist[i].url).length > 0) {
          this.playlist[i].fav = true;
        } else {
          this.playlist[i].fav = false;
        }
      }
    }
  }

  })
}

  ///// downloading ck
 async downloadingck() {
    this.downloadgck()

    await Storage.get({key:'downloadq'}).then(async (traks) => {
      if(traks.value)
      {
        let val = JSON.parse(traks.value);
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
 async downloadgck() {
    await Storage.get({key:'download'}).then(async (traks) => {
      if(traks.value)
      {
        let val = JSON.parse(traks.value);

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


  }

  async downloadAll() {
    let track = this.playlist
      await Storage.get({key:'downloadq'}).then(async (traks) => {
        if(traks.value)
        {
          let val = JSON.parse(traks.value);
      if (Array.isArray(val)) {
        const filteredPeople = val;
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.concat(track);
          let primes = this.favourit.concat(this.playlist);
         // this.storage.set('download', primes)
          await Storage.set({key:'downloadq',value: JSON.stringify(primes)})
          .then(()=>{
            this.ckfev();
          })
        }
        else {
          await Storage.set({key:'downloadq',value: JSON.stringify([track])})
          .then(()=>{
            this.ckfev();
          })
        }
      }
      else {
        await Storage.set({key:'downloadq',value: JSON.stringify(track)})
        .then(()=>{
          this.ckfev();
        })
       }
      }      else {
        await Storage.set({key:'downloadq',value: JSON.stringify(track)})
        .then(()=>{
          this.ckfev();
        })
       }

    })
  }
  /// add in downloadq
  async downloadQ(track: track) {
    await Storage.get({key:'downloadq'}).then(async (traks) => {
      if(traks.value)
      {
        let val = JSON.parse(traks.value);

      if (Array.isArray(val)) {
        const filteredPeople = val.filter((item) => item.url != track.url);
        if (Array.isArray(filteredPeople)) {
          this.favourit = filteredPeople;
          this.favourit.push(track)
          //console.log(this.favourit)
          await Storage.set({key:'downloadq', value: JSON.stringify(this.favourit)}).then(() => {
            this.ckfev();

          })
        }
        else {
            await Storage.set({key:'downloadq', value: JSON.stringify([track])}).then(() => {
              this.ckfev();

           })
        }
      }
      else {
        await Storage.set({key:'downloadq', value: JSON.stringify([track])}).then(() => {
          this.ckfev();
        })
      }
    }
    })
    this.api.downloadQstartnext(track.id);
    this.dqlist()
  }

  async dqlist() {
    await Storage.get({key:'downloadq'}).then((val) => {
      this.downloadQlist = JSON.parse(val.value);
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

async get_storedlist(){
  await Storage.get({key:'storedaudio'}).then((val) => {
    if(val.value)
  {
  this.storedid = JSON.parse(val.value)
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
