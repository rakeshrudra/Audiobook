import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { track } from '../model/track';
import { chapter } from '../model/chapter';
import { book } from '../model/book';
import { NewapiService } from '../newapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchbar',{static:true}) searchbar;
  searchTerm;
  atrack: track;
  constructor(public api: ApiService, public _api : NewapiService, public route: ActivatedRoute,  public router: Router, public storage: Storage, private platform: Platform) {

  }
  data = null;
  books : book[] =[];
  //books = this.route.snapshot.data['books'];
  defaultImage = '/assets/logo.jpeg';
  audios: track[] = []
  chapters: chapter[] = [];
  SearchPage : string = '';
  ngOnInit() {
    /*this.api.modules().subscribe(data=>{
      this.data = data;
    })*/
    this.storage.get('lastdate').then(lastdate=>{

      this._api.latestaudio('?lastdate='+lastdate).subscribe((val: track[]) => {
        if (val.length > 0) {

            this.storage.get('allaudios').then((e : track[]) => {
              var ff = e;
              for(var i =0; i < val.length; i++)
              {
                 ff = ff.filter(e=>e.id != val[i].id);
               //this.storage.set('allaudios',ff)
              }
              var newar = ff.concat(val);
              this.storage.set('allaudios',newar).then(()=>{
                console.log(newar);
              })
              //this.router.navigate(['/tab'], { replaceUrl: true })
              // this.timmer()
           // }).then(() => {
              //this.api.isapiloadingnext(true);
              var date =new Date().toLocaleString();
              this.storage.set('lastdate', date)

            })
        }else
        {
          var date =new Date().toLocaleString();
          this.storage.set('lastdate', date)
        }
      })
    })

    this.storage.get('lasttrack').then((val: track) => {
      this.atrack = val
    })
    this.api.showplayernext(false)
    /*this.storage.get('allaudios').then((val: track[]) => {
      this.audios = val;//this.router.navigate(['/tab'], { replaceUrl: true })
      this.jsonaudiofun()
    })*/
    this.storage.get('chapters').then((val: chapter[]) => {
      this.chapters = val;//this.router.navigate(['/tab'], { replaceUrl: true })
      console.log(val)
    })

    this.storage.get('allbooks').then((val:book[])=>{
      this.books = val;
    })
    setTimeout(() => {
      this.searchbar.setFocus();
  }, 3000);
  }
  searchfocus() {
    //this.router.navigate(['/mainsearch'])
  }
  ionViewDidEnter() {
    this.ngOnInit();
    setTimeout(() => {
      this.searchbar.setFocus();
  }, 5);
  this.selectedbook = '';
  this.selectedchapter = '';

  }
  pay() {
    this.api.showplayernext(true)
    this.router.navigate(['/tab/home/play'])
  }
  playserch(data) {
    this._api.audio('?a_id='+data.id).subscribe((val:track[])=>{


    let a = val.find(e=>e.id==data.id);

    let index = val.indexOf(a);
    this.api.audiolistnext(val)
    this.api.playnonext(index)
    })
    // this.router.navigate(['/tab/home/play'])
  }

  jsonaudiofun()
  {
    if(this.audios.length < 1)
    {
    this.api.localaudio().subscribe(values=>{
      //this.audios = values
    })
   }
  }
  timeout;
  audioloader : boolean = false
  search()
  {
    this.audioloader = true
    this.audios = []
    clearTimeout(this.timeout);
    this.timeout = setTimeout(()=>{
      this._api.searchtrack('?search='+this.searchTerm+'&book_id='+this.selectedbook+'&chapter_id='+this.selectedchapter).subscribe(val=>{
        this.audios = val;
        if(val.length == 0){
          this.audios = null;
        }
        this.audioloader = false
      },er=>{
        this.audioloader = false
      })
    },1000)
  }
  selectedbook = '';
  selectedchapter = '';
  bookChange($event){
    this.selectedbook = $event.target.value;
    this._api.chapters('?book_id='+this.selectedbook).subscribe(val=>{
      this.chapters = val;
      this.search();
    })
  }
  chapterChange($event){
    this.selectedchapter =  $event.target.value;
    this.search();
  }

}
