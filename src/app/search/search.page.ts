import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Platform } from '@ionic/angular';

import { track } from '../model/track';
import { chapter } from '../model/chapter';
import { book } from '../model/book';
import { NewapiService } from '../newapi.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchbar',{static:true}) searchbar;
  searchTerm ='';
  atrack: track;
  constructor(public api: ApiService, public _api : NewapiService, public route: ActivatedRoute,  public router: Router, private platform: Platform) {

  }
  data = null;
  books : book[] =[];
  //books = this.route.snapshot.data['books'];
  defaultImage = '/assets/logo.jpeg';
  audios: track[] = []
  chapters: chapter[] = [];
  SearchPage : string = '';
  async ngOnInit() {

    await Storage.get({key:'chapters'}).then((val) => {
      this.chapters = JSON.parse(val.value);//this.router.navigate(['/tab'], { replaceUrl: true })
      console.log(val)
    })
    await Storage.get({key:'allbooks'}).then((val) => {
      this.books = JSON.parse(val.value);//this.router.navigate(['/tab'], { replaceUrl: true })
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
     // this._api.searchtrack('?search='+this.searchTerm+'&book_id='+this.selectedbook+'&chapter_id='+this.selectedchapter).subscribe(val=>{
      var formData_new = new FormData();
      for(var i =0; i<this.selectedbook.length;i++)
      {
        if(this.selectedbook[i] !=''){
       formData_new.append('book_id[]',this.selectedbook[i]);
        }
      }

      formData_new.append('search',this.searchTerm);

      for(var i =0; i<this.selectedchapter.length;i++)
      {
        if(this.selectedchapter[i] !=''){
       formData_new.append('chapter_id[]',this.selectedchapter[i]);
        }
      }

        this._api.post_searchtrack(formData_new).subscribe(val=>{
        this.audios = val;
        this.audioloader = false
      },er=>{
        this.audioloader = false
      })
    },1000)
  }
  selectedbook = '';
  selectedchapter = '';
  bookChange($event){
    //this.selectedbook = $event.target.value;
    if(this.selectedbook[0] == ''){
      this.selectedbook = '';
      console.log(this.selectedbook)
    }

    var formData_new = new FormData();
    this.selectedchapter = '';

   for(var i =0; i<this.selectedbook.length;i++)
   {
    formData_new.append('book_id[]',this.selectedbook[i]);
   }
    this._api.post_chapters(formData_new).subscribe(val=>{
      this.chapters = val;
      this.search();
    })
  }
  chapterChange($event){
   // this.selectedchapter =  $event.target.value;
   if(this.selectedchapter[0] == ''){
     this.selectedchapter = '';
     console.log(this.selectedchapter)
   }
    this.search();
  }

}
