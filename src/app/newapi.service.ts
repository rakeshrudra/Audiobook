import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { track } from './model/track';
import { book } from './model/book';
import { chapter } from './model/chapter';

import { topic } from './model/topic';
import { dateFormate } from './model/dateFormate';
import { parse } from 'path';

export interface timing {
  Asr: string,
  Dhuhr: string,
  Fajr: string,
  Imsak: string,
  Isha: string,
  Maghrib: string,
  Midnight: string,
  Sunrise: string,
}

@Injectable({
  providedIn: 'root'
})
export class NewapiService {
  url = 'https://islamicaudiobooks.info/audioapp/index.php/api/';

  //url ='http://localhost/audiobook/index.php/api/';
  url_module = this.url + 'moduls';
  url_book = this.url + 'books';
  url_bookdata = this.url + 'book';
  url_chapter = this.url + 'chapters';
  url_audio = this.url + 'audio';
  url_audios = this.url + 'audios';
  url_slider = this.url + 'slider';
  url_feedback = this.url + 'feedback';
  url_trandingaudio = this.url + 'trandingaudio';
  url_topic = this.url + 'topic';
  url_updatecheck = this.url + 'updatecheck';
  url_dailyazkar = this.url + 'dailyazkar';
  url_appupdatechecker = this.url + 'appupdatechecker';
  url_faq = this.url + 'faq';
  url_latestaudio = this.url + 'latestaudio';

  url_testimonial = this.url + 'testimonial';

  url_previouschapteraudio = this.url + 'previouschapteraudio';

  url_audiotracksbycp = this.url + 'audiotracksbycp';
  url_searchtrack = this.url + 'searchtrack';
  url_search = this.url + 'search';
  url_nextchapteraudio = this.url + 'nextchapteraudio';



  playlist: track[] = []

  constructor(public http: HttpClient) { }
  audiolist = new BehaviorSubject<track[]>(this.playlist)
  activetrack = new BehaviorSubject<track>(null)
  currentaudio = new BehaviorSubject<track>(null)
  todayTimings = new BehaviorSubject<timing>(null)
  playno = new BehaviorSubject<number>(0)
  showplayer = new BehaviorSubject<boolean>(false)
  isapiloading = new BehaviorSubject<boolean>(false)


  activeClass = new BehaviorSubject<string>('light')
  qublaLocation = new BehaviorSubject<number>(null)
  currentLocationLat = new BehaviorSubject<number>(null)
  currentLocationLong = new BehaviorSubject<number>(null)

  get_api() {
    return this.http.get<[any]>(this.url)
  }

  testimonial(): Observable<[{ name: string, message: string }]> {
    return this.http.get<[{ name: string, message: string }]>(this.url_testimonial)
  }
  appupdatechecker(uri): Observable<{ status: number, data: number }> {
    return this.http.get<{ status: number, data: number }>(this.url_appupdatechecker + `${uri}`)
  }
  localaudio(): Observable<Array<track>> {
    return this.http.get<Array<track>>('/assets/audios.json')
  }

  updatecheck(): Observable<{ status: number }> {
    return this.http.get<{ status: number }>(this.url_updatecheck)
  }
  modules() {
    return this.http.get<Array<{ modulename: string, newaudios: Array<string> }>>(this.url_module)
  }
  faqs(): Observable<Array<{ question: string, ans: string }>> {
    return this.http.get<Array<{ question: string, ans: string }>>(this.url_faq)
  }
  slider() {
    return this.http.get(this.url_slider)
  }
  books(uri): Observable<book[]> {
    return this.http.get<book[]>(this.url_book + `${uri}`)
  }
  book(uri): Observable<book[]> {
    return this.http.get<book[]>(this.url_bookdata + `${uri}`)
  }

  latestaudio(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_latestaudio + `${uri}`)
  }


  allbook(data): Observable<book[]> {
    return this.http.get<book[]>(this.url_book)
  }

  chapters(uri) //: Observable<chapter[]>
  {
    return this.http.get<chapter[]>(this.url_chapter + `${uri}`)
  }
  post_chapters(uri) //: Observable<chapter[]>
  {
    return this.http.post<chapter[]>(this.url_chapter, uri)
  }



  allchapters(data): Observable<chapter[]> {
    return this.http.get<chapter[]>(this.url_chapter)
  }

  audio(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_audio + `${uri}`)
  }

  audiobybook(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_audio + `${uri}`)
  }

  audiotracksbycp(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_audiotracksbycp + `${uri}`)
  }

  searchtrack(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_searchtrack + `${uri}`)
  }
  post_searchtrack(uri): Observable<track[]> {
    return this.http.post<track[]>(this.url_searchtrack, uri)
  }

  get_nextchapteraudio(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_nextchapteraudio + `${uri}`)
  }



  previouschapteraudio(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_previouschapteraudio + `${uri}`)
  }


  allaudio(data): Observable<track[]> {
    return this.http.get<track[]>(this.url_audios)
  }
  dailyazkar(): Observable<track[]> {
    return this.http.get<track[]>(this.url_dailyazkar)
  }
  trandingaudio(): Observable<track[]> {
    return this.http.get<track[]>(this.url_trandingaudio)
  }

  feedback(uri): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(this.url_feedback + `${uri}`)
  }
  audiofindbook(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_audios + `${uri}`)
  }
  audiofindchapter(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_audios + `${uri}`)
  }
  search(uri): Observable<track[]> {
    return this.http.get<track[]>(this.url_search + `${uri}`)
  }

  alltopic(): Observable<topic[]> {
    return this.http.get<topic[]>(this.url_topic)
  }
  topicbychapter(uri): Observable<topic[]> {
    return this.http.get<topic[]>(this.url_topic + `${uri}`)
  }
  prayerTime(params): Observable<{ data: Array<{ date: dateFormate, timings: timing }> }> {
    return this.http.get<{ data: Array<{ date: dateFormate, timings: timing }> }>('https://api.aladhan.com/v1/calendar', { params: params })
  }

  audiolistnext(data) {
    this.audiolist.next(data)
  }
  playnonext(data) {
    this.playno.next(data)
  }
  currentaudionext(data) {
    this.currentaudio.next(data)
  }
  activeClassnext(data) {
    this.activeClass.next(data)
  }
  showplayernext(val) {
    this.showplayer.next(val)
  }
  activetracknext(c) {
    this.activetrack = c;
  }
  isapiloadingnext(c) {
    this.isapiloading = c
  }
  qublaLocationNext(c) {
    // console.log(c);
    this.qublaLocation.next(c);
  }

  currentLocationLatNext(c) {
    // console.log(c);
    this.currentLocationLat.next(c);
  }
  currentLocationLongNext(c) {
    // console.log(c);
    this.currentLocationLong.next(c);
  }

  todayTimingsNext(c) {
    // console.log(c);
    this.todayTimings.next(c);
  }
  ////

  nexTime(times: timing) {

    const d = new Date();
    const currentHr = d.getHours();
    const currentMin = d.getMinutes();
    const hrToMin = currentHr * 60 + currentMin;

    //FAJR
    let arr_f = times.Fajr.replace(" (IST)", "");
    let asr_f = arr_f.split(":");
    let asstTime_f = parseInt(asr_f[0]);
    asstTime_f = (asstTime_f * 60 + parseInt(asr_f[1]));
    //Dhuhr
    let arr_d = times.Dhuhr.replace(" (IST)", "");
    let asr_d = arr_d.split(":");
    let asstTime_d = parseInt(asr_d[0]);
    asstTime_d = (asstTime_d * 60 + parseInt(asr_d[1]));
    //ASR
    let arr_a = times.Asr.replace(" (IST)", "");
    let asr_a = arr_a.split(":");
    let asstTime_a = parseInt(asr_a[0]);
    asstTime_a = (asstTime_a * 60 + parseInt(asr_a[1]));
    //Maghrib
    let arr_m = times.Maghrib.replace(" (IST)", "");
    let asr_m = arr_m.split(":");
    let asstTime_m = parseInt(asr_m[0]);
    asstTime_m = (asstTime_m * 60 + parseInt(asr_m[1]));
    //Isha
    let arr_i = times.Isha.replace(" (IST)", "");
    let asr_i = arr_i.split(":");
    let asstTime_i = parseInt(asr_i[0]);
    asstTime_i = (asstTime_i * 60 + parseInt(asr_i[1]));



    if (asstTime_f > hrToMin && asstTime_d > hrToMin) {
      return this.minToHrform(asstTime_f - hrToMin) + " left until Fajr";
    }
    if (asstTime_d > hrToMin && asstTime_a > hrToMin) {
      console.log("Dhua")
      return this.minToHrform(asstTime_d - hrToMin) + " left until Dhuhr";
    }

    if (asstTime_a > hrToMin && asstTime_m > hrToMin) {
      return this.minToHrform(asstTime_a - hrToMin) + " left until Asr";
    }
    if (asstTime_m > hrToMin) {
      console.log("mag")
      return this.minToHrform(asstTime_m - hrToMin) + " left until Maghrib";
    }
    if (asstTime_i > hrToMin && asstTime_i > hrToMin) {
      console.log("isha")
      return this.minToHrform(asstTime_i - hrToMin) + " left until Isha";
    }

  }

  minToHrform(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds * 60);
    return date.toISOString().substr(11, 8);
  }

    ////

    nexPrayerTime(times: timing) {

      const d = new Date();
      const currentHr = d.getHours();
      const currentMin = d.getMinutes();
      const hrToMin = currentHr * 60 + currentMin;
      //FAJR
      let arr_f = times.Fajr.replace(" (IST)", "");
      let asr_f = arr_f.split(":");
      let asstTime_f = parseInt(asr_f[0]);
      asstTime_f = (asstTime_f * 60 + parseInt(asr_f[1]));
      //Dhuhr
      let arr_d = times.Dhuhr.replace(" (IST)", "");
      let asr_d = arr_d.split(":");
      let asstTime_d = parseInt(asr_d[0]);
      asstTime_d = (asstTime_d * 60 + parseInt(asr_d[1]));
      //ASR
      let arr_a = times.Asr.replace(" (IST)", "");
      let asr_a = arr_a.split(":");
      let asstTime_a = parseInt(asr_a[0]);
      asstTime_a = (asstTime_a * 60 + parseInt(asr_a[1]));
      //Maghrib
      let arr_m = times.Maghrib.replace(" (IST)", "");
      let asr_m = arr_m.split(":");
      let asstTime_m = parseInt(asr_m[0]);
      asstTime_m = (asstTime_m * 60 + parseInt(asr_m[1]));
      //Isha
      let arr_i = times.Isha.replace(" (IST)", "");
      let asr_i = arr_i.split(":");
      let asstTime_i = parseInt(asr_i[0]);
      asstTime_i = (asstTime_i * 60 + parseInt(asr_i[1]));


      if (asstTime_f > hrToMin && asstTime_d > hrToMin) {
        return "Fajr";
      }
      if (asstTime_d > hrToMin && asstTime_a > hrToMin) {
        console.log("Dhua")
        return "Dhuhr";
      }

      if (asstTime_a > hrToMin && asstTime_m > hrToMin) {
        return "Asr";
      }
      if (asstTime_m > hrToMin) {
        console.log("mag")
        return "Maghrib";
      }
      if (asstTime_i > hrToMin && asstTime_i > hrToMin) {
        return "Isha";
      }
      return "";

    }



}
