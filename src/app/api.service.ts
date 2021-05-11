import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { track } from './model/track';
import { book } from './model/book';
import { chapter } from './model/chapter';
import { Storage } from '@ionic/storage';
import { topic } from './model/topic';
import { PlaynewmediaService } from './service/playnewmedia.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

 url ='https://islamicaudiobooks.info/audioapp/index.php/api/';

 //url ='http://localhost/audiobook/index.php/api/';
  url_module = this.url+'moduls';
  url_book = this.url+'books';
  url_bookdata = this.url+'book';
  url_chapter = this.url+'chapters';
  url_audio = this.url+'audio';
  url_audios = this.url+'audios';
  url_slider = this.url+'slider';
  url_feedback = this.url+'feedback';
  url_trandingaudio = this.url+'trandingaudio';
  url_topic = this.url+'topic';
  url_updatecheck = this.url+'updatecheck';
  url_dailyazkar = this.url+'dailyazkar';
  url_fbtoken = this.url+'fbtoken';


  playlist : track[] = []

  constructor(public http: HttpClient , public storage : Storage , public audioser : PlaynewmediaService) { }
  audiolist = new BehaviorSubject<track[]>(this.playlist)
  activetrack = new BehaviorSubject<track>(null)
  currentaudio = new BehaviorSubject<track>(null)
  playno = new BehaviorSubject<number>(0)
  showplayer = new BehaviorSubject<boolean>(false)
  isapiloading = new BehaviorSubject<boolean>(false);
  showplayerinnext = new BehaviorSubject<boolean>(true);
  playnextchapter = new BehaviorSubject<boolean>(true);

  downloadQstart = new BehaviorSubject<string>(null);





  activeClass = new BehaviorSubject<string>('light')

  chapterUrl = new BehaviorSubject<string>('');
  topicUrl = new BehaviorSubject<string>('');
  bookUrl = new BehaviorSubject<string>('');

  bookUrlnext(val)
  {
     this.bookUrl.next(val)
  }
  chapterUrlnext(val)
  {
     this.chapterUrl.next(val)
  }
  topicUrlnext(val)
  {
     this.topicUrl.next(val)
  }




  downloadQstartnext(val)
  {
     this.downloadQstart.next(val)
  }

  playnextchapternext(val)
  {
     this.playnextchapter.next(val)
  }

  showplayerinnextnext(val)
  {
     this.showplayerinnext.next(val)
  }



  localaudio() : Observable<Array<track>>
  {
   return this.http.get<Array<track>>('/assets/audios.json')
  }

  updatecheck() : Observable<{status:number}>
  {
     return this.http.get<{status:number}>(this.url_updatecheck)
  }
  modules()
  {
     return this.http.get(this.url_module)
  }
  slider()
  {
     return this.http.get(this.url_slider)
  }
  books(data) : Observable<book[]>
  {
     let uri = '?';
     if(typeof  data.module)
     {
        uri = uri+'modules='+data.module
     }
     return this.http.get<book[]>(this.url_book+`${uri}`)
  }
  book(data) : Observable<book[]>
  {
   let uri = '?';
   if(typeof  data.book_id)
   {
      uri = uri+'id='+data.book_id
   }
   return this.http.get<book[]>(this.url_bookdata+`${uri}`)
  }

  allbook(data) : Observable<book[]>
  {
   return this.http.get<book[]>(this.url_book)
  }

  chapters(data) //: Observable<chapter[]>
  {
   /*let uri = '?';
   if(typeof  data.book_id)
   {
      uri = uri+'book_id='+data.book_id
   }

   return this.http.get<chapter[]>(this.url_chapter+`${uri}`)*/
    this.storage.get('chapters').then(val=>{
       if(val)
       {
          return val.filter((val)=>{ val.book_id == data.book_id})
       }
    })
  }

  allchapters(data) : Observable<chapter[]>
  {
   return this.http.get<chapter[]>(this.url_chapter)
  }

  audio(data) : Observable<track[]>
  {
   let uri = '?';
   if(typeof data.chapter)
   {
      uri = uri+'chapter='+data.chapter
   }
   return this.http.get<track[]>(this.url_audio+`${uri}`)
  }

  audiobybook(data) : Observable<track[]>
  {
   let uri = '?';
   if(typeof data.book)
   {
      uri = uri+'book_id='+data.book
   }
   return this.http.get<track[]>(this.url_audio+`${uri}`)
  }


  allaudio(data) : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_audios)
  }
  dailyazkar() : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_dailyazkar)
  }
  trandingaudio() : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_trandingaudio)
  }

  feedback(data) : Observable<{message:string}>
  {
   let uri = '?';
   if(typeof data.chapter)
   {
      uri = uri+'name='+data.name+'&email='+data.email+'&feedback='+data.feedback+'&app='+data.app+'&platform=android'
   }
   return this.http.get<{message:string}>(this.url_feedback+`${uri}`)
  }


  audiofindbook(data) : Observable<track[]>
  {
     console.log(data)
   let uri = '?';
   if(typeof  data.book_id)
   {
      uri = uri+'book_id='+data.book_id
   }
    return this.http.get<track[]>(this.url_audios+`${uri}`)
  }
  audiofindchapter(data) : Observable<track[]>
  {
     console.log(data)
   let uri = '?';
   if(typeof  data.chapter)
   {
      uri = uri+'chapter='+data.chapter
   }
    return this.http.get<track[]>(this.url_audios+`${uri}`)
  }
  alltopic() : Observable<topic[]>
  {
    return this.http.get<topic[]>(this.url_topic)
  }
  get_fbtoken(data){
    let uri = '?';
    if(typeof  data)
    {
       uri = uri+'token='+data
    }

    return this.http.get<topic[]>(this.url_fbtoken+`${uri}`)
  }
  audiolistnext(data)
  {
     this.audioser.download_close();
     this.audiolist.next(data)
  }
  playnonext(data)
  {
     this.playno.next(data)
  }
  currentaudionext(data)
  {
     this.currentaudio.next(data)
  }
  activeClassnext(data)
  {
     this.activeClass.next(data)
  }
  showplayernext(val)
  {
     this.showplayer.next(val)
  }
  activetracknext(c)
  {
     this.activetrack = c;
  }
  isapiloadingnext(c)
  {
     this.isapiloading = c
  }
}
