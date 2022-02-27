import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { track } from './model/track';
import { book } from './model/book';
import { chapter } from './model/chapter';
import { Storage } from '@ionic/storage';
import { topic } from './model/topic';


@Injectable({
  providedIn: 'root'
})
export class NewapiService {
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
  url_appupdatechecker = this.url+'appupdatechecker';
  url_faq = this.url+'faq';
  url_latestaudio =  this.url+'latestaudio';

  url_testimonial = this.url+'testimonial';

  url_previouschapteraudio = this.url+'previouschapteraudio';

  url_audiotracksbycp = this.url+'audiotracksbycp';
  url_searchtrack = this.url+'searchtrack';
  url_search = this.url+'search';
  url_nextchapteraudio = this.url+'nextchapteraudio';



  playlist : track[] = []

  constructor(public http: HttpClient , public storage : Storage) { }
  audiolist = new BehaviorSubject<track[]>(this.playlist)
  activetrack = new BehaviorSubject<track>(null)
  currentaudio = new BehaviorSubject<track>(null)
  playno = new BehaviorSubject<number>(0)
  showplayer = new BehaviorSubject<boolean>(false)
  isapiloading = new BehaviorSubject<boolean>(false)


  activeClass = new BehaviorSubject<string>('light')
  qublaLocation = new BehaviorSubject<number>(null)

  get_api()
  {
    return this.http.get<[any]>(this.url)
  }

  testimonial() : Observable<[{name: string,message : string}]>
  {
   return this.http.get<[{name: string,message : string}]>(this.url_testimonial)
  }
  appupdatechecker(uri) : Observable<{status: number,data : number}>
  {
   return this.http.get<{status: number,data : number}>(this.url_appupdatechecker+`${uri}`)
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
     return this.http.get<Array<{modulename:string,newaudios : Array<string>}>>(this.url_module)
  }
  faqs() : Observable<Array<{question:string,ans:string}>>
  {
     return this.http.get<Array<{question:string,ans:string}>>(this.url_faq)
  }
  slider()
  {
     return this.http.get(this.url_slider)
  }
  books(uri) : Observable<book[]>
  {
     return this.http.get<book[]>(this.url_book+`${uri}`)
  }
  book(uri) : Observable<book[]>
  {
   return this.http.get<book[]>(this.url_bookdata+`${uri}`)
  }

  latestaudio(uri) : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_latestaudio+`${uri}`)
  }


  allbook(data) : Observable<book[]>
  {
   return this.http.get<book[]>(this.url_book)
  }

  chapters(uri) //: Observable<chapter[]>
  {
   return this.http.get<chapter[]>(this.url_chapter+`${uri}`)
  }
  post_chapters(uri) //: Observable<chapter[]>
  {
   return this.http.post<chapter[]>(this.url_chapter,uri)
  }



  allchapters(data) : Observable<chapter[]>
  {
   return this.http.get<chapter[]>(this.url_chapter)
  }

  audio(uri) : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_audio+`${uri}`)
  }

  audiobybook(uri) : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_audio+`${uri}`)
  }

  audiotracksbycp(uri) : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_audiotracksbycp+`${uri}`)
  }

  searchtrack(uri) : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_searchtrack+`${uri}`)
  }
  post_searchtrack(uri) : Observable<track[]>
  {
   return this.http.post<track[]>(this.url_searchtrack,uri)
  }

  get_nextchapteraudio(uri) : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_nextchapteraudio+`${uri}`)
  }



  previouschapteraudio(uri) : Observable<track[]>
  {
   return this.http.get<track[]>(this.url_previouschapteraudio+`${uri}`)
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

  feedback(uri) : Observable<{message:string}>
  {
   return this.http.get<{message:string}>(this.url_feedback+`${uri}`)
  }
  audiofindbook(uri) : Observable<track[]>
  {
    return this.http.get<track[]>(this.url_audios+`${uri}`)
  }
  audiofindchapter(uri) : Observable<track[]>
  {
    return this.http.get<track[]>(this.url_audios+`${uri}`)
  }
  search(uri) : Observable<track[]>
  {
    return this.http.get<track[]>(this.url_search+`${uri}`)
  }

  alltopic() : Observable<topic[]>
  {
    return this.http.get<topic[]>(this.url_topic)
  }
  topicbychapter(uri) : Observable<topic[]>
  {
    return this.http.get<topic[]>(this.url_topic+`${uri}`)
  }
  prayerTime(params) : Observable<topic[]>
  {
    return this.http.get<topic[]>('https://api.aladhan.com/v1/calendar',{params: params})
  }

  audiolistnext(data)
  {
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
  qublaLocationNext(c)
  {
   // console.log(c);
     this.qublaLocation.next(c);
  }

}
