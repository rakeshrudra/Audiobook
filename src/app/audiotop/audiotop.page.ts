import { NewapiService } from './../newapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { chapter } from '../model/chapter';
import { book } from '../model/book';
import { LoadingController, IonContent } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { topic } from '../model/topic';
import { track } from '../model/track';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Plugins } from '@capacitor/core';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
const { CapacitorMusicControls , Share } = Plugins;

@Component({
  selector: 'app-audiotop',
  templateUrl: './audiotop.page.html',
  styleUrls: ['./audiotop.page.scss'],
})
export class AudiotopPage implements OnInit {

  constructor(public loadingController: LoadingController, public socialSharing: SocialSharing, public api: ApiService, public route: ActivatedRoute, private firebaseDynamicLinks : FirebaseDynamicLinks,
    public storage: Storage, public router: Router, public _api : NewapiService) {
    this.chapter_id = route.snapshot.params.id;
  }
  jsonaudio = '/assets/audios.json';
  playlist: Array<topic>  = this.route.snapshot.data['topic'];
  chapter: chapter; //= this.route.snapshot.data['book'][0];
  chapter_id = this.route.snapshot.paramMap.get('id');
  defaultImage = '/assets/loader.gif';
  defaultImage1 = '/assets/loader.gif';
  favourit;
  modalOpen: boolean = false;
  menu = 'topic';

  ngOnInit() {
    /*this.storage.get('alltopic').then((values: topic[]) => {
      this.playlist = values.filter(list => list.chapter_id === this.chapter_id)
    })*/
  }
  ionViewWillEnter(){

    this._api.topicbychapter("?chapter_id="+this.chapter_id).subscribe(val=>{
      this.playlist = val;
    })
    this.storage.get('chapters').then((values: chapter[]) => {
      if (values) {
        this.chapter = values.filter(list => list.id === this.chapter_id)[0]
      }
    })
    this.get_storedlist()
  }
  getColor(book:track)
  {
    return book.color;
  }

  play(id) {
    //const val = values.filter(list => list.book_id === this.book_id )
    this.storage.get('allaudios').then((values: track[]) => {
      if (values) {

        const val = values.filter(list => list.topic === id);
        if (val.length > 0) {
          console.log(val, id);
          this.api.playnonext(0)
          this.api.audiolistnext(val)
          this.api.showplayernext(true)
          if (val.length > 0) {
            //this.router.navigate(['/tab/home/play'])
          }
        } else {
          this.jsonaudiofun(id)
        }
      } else {
        this.jsonaudiofun(id)
      }
    })
  }

  jsonaudiofun(id) {
    if (this.playlist.length < 1) {
      this.api.localaudio().subscribe(values => {
        const val = values.filter(list => list.topic === id);
        this.api.playnonext(0)
        this.api.audiolistnext(val)
        this.api.showplayernext(true)
        if (val.length > 0) {
          //this.router.navigate(['/tab/home/play'])
        }
      })
    }
  }



  segmentChanged(e) {
    if (e.target.value != '1') {
      this.menu = e.target.value;
    }
  }
  details(e) {
    this.menu = e;
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

 async shareaudio(msg,id) {
    console.log(msg)

    this.presentLoadingWithOptions();
   // let ccc = "To listen to more topics from " + msg + " download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info";
    this.presentLoadingWithOptions();
    let ccc = "To listen to more  from "+msg+" click here ";
    this.firebaseDynamicLinks.createShortDynamicLink({
      domainUriPrefix: "https://islamicaudiobooks.page.link/",
      link: "https://islamicaudiobooks.info/book/"+id,
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
      text:  res,//'Download Islamic Audio Books app https://play.google.com/store/apps/details?id=com.urduaudiobooks.urdutafsir&hl=en or visit www.islamicaudiobooks.info to listen to free Islamic Audio Books',
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
  checkstatusnew(alist:Array<any>){
    var v =alist.every(v => this.storedid.includes(v));
    console.log(alist,this.storedid,v);
    return v;
  }

  }
