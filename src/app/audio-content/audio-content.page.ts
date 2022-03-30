import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audio-content',
  templateUrl: './audio-content.page.html',
  styleUrls: ['./audio-content.page.scss'],
})
export class AudioContentPage implements OnInit {

  @Input('audio') audio;
  selectedCard = 'english';


  constructor() { }

  ngOnInit() {
  }
  segmentChanged(event)
  {
    this.selectedCard = event.detail.value;
  }
}
