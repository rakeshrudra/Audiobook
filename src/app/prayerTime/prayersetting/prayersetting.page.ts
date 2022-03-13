import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Component({
  selector: 'app-prayersetting',
  templateUrl: './prayersetting.page.html',
  styleUrls: ['./prayersetting.page.scss'],
})
export class PrayersettingPage implements OnInit {

  constructor() { }
  methodVal;

 async ngOnInit() {
    const ret = await Storage.get({ key: 'method' });
    this.methodVal = ret.value;
  }
  setMethod()
  {
    this.setObject();
  }
  async setObject() {
    await Storage.set({
      key: 'method',
      value: this.methodVal
    });
  }
}
