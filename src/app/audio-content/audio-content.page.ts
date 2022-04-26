import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-audio-content',
  templateUrl: './audio-content.page.html',
  styleUrls: ['./audio-content.page.scss'],
})
export class AudioContentPage implements OnInit {

  @Input('audio') audio;
  selectedCard = 'english';
  enCon;
  arCon;

  constructor(private sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.enCon = this.sanitizer.bypassSecurityTrustHtml(this.audio.contentText) ;
    this.arCon = this.sanitizer.bypassSecurityTrustHtml(this.audio.contentTextArabic) ;
  }
  segmentChanged(event)
  {
    this.selectedCard = event.detail.value;
  }
}
