import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { chapter } from '../model/chapter';
import { book } from '../model/book';

@Component({
  selector: 'app-bookmodal',
  templateUrl: './bookmodal.page.html',
  styleUrls: ['./bookmodal.page.scss'],
})
export class BookmodalPage implements OnInit {

  constructor(public api : ApiService, public route : ActivatedRoute, public router : Router) { 
  }
  playlist : Array<chapter> = null;
  book : book;
  defaultImage = './assets/logo.jpeg'
  @Input() book_id: string;

  ngOnInit() {
    /*this.api.chapters({book_id:this.book_id}).subscribe(val=>{
      this.playlist = val
  })*/
 this.api.book({book_id:this.book_id}).subscribe(val=>{
    this.book = val[0]
 })
}
  play(id)
  {
    this.api.audiofindchapter({chapter:id}).subscribe(val=>{
      this.api.playnonext(0)
      this.api.audiolistnext(val)
      this.router.navigate(['/tab/home/play'])

    })
  }


}
