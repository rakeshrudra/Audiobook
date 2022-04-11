import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {validation_message} from '../valid_message'
import { ApiService } from '../api.service';
import { ToastController, LoadingController } from '@ionic/angular';
//import { AppVersion } from '@ionic-native/app-version/ngx';

import { Device } from '@capacitor/device';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  validation_message = validation_message
  constructor(public _fb : FormBuilder , public loadingController : LoadingController, public toastController : ToastController, public router : Router , public api : ApiService) {
 /*   this.appVersion.getVersionNumber().then(e => {
      this.app = e;
  })*/

 }
app = '';
  register_slot_submited = false;
  feedback =null;
  val1 = 1;
  val2 = 6;
  cperror : boolean = false;
  total = this.val1+this.val2;
  profileForm = this._fb.group({
    name : [null,Validators.required],
    email : [null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-\.]+\.[a-z]{2,4}$")]],
    feedback : [null,Validators.required],
    captua : [null,Validators.required],
    app : [this.app]
  })
  ngOnInit() {
       this.feedbackget();
       this.refresh();
       //this.presentLoadingWithOptions();
       this.appBuild();

  }
  async appBuild(){
    const info = await Device.getInfo();
      this.app = info.name;
  }
  searchfocus()
  {
    this.router.navigate(['/tab/search'])
  }
 async submit()
  {
    this.cperror = false;
    this.register_slot_submited = true
    if(this.profileForm.value.captua === this.total)
    {
      this.cperror = false;
      this.profileForm.patchValue({
        app : this.app
      })
    if(this.profileForm.valid)
    {
      console.log(this.profileForm.value)
      this.presentLoadingWithOptions();
      this.api.feedback(this.profileForm.value).subscribe(async val=>{
       this.register_slot_submited = false
       await Storage.set({key:'feedback',value: JSON.stringify(this.profileForm.value)}).then(val=>{
         this.presentToast();
         this.profileForm.reset();
         this.feedbackget();
         this.profileForm.reset()
       });
      })
    }
  }
  else
  {
    this.cperror = true;
  }
  }
  async presentToast() {
    this.loadingController.dismiss()
    const toast = await this.toastController.create({
      message: 'Thank you for your feedback. Feedback received.',
      duration: 2000
    });
    toast.present();
  }
 async feedbackget()
  {
    await Storage.get({key:'feedback'}).then(val=>{
      this.feedback = JSON.parse(val.value);
    })
  }
  refresh()
  {
    this.val1 = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
    this.val2 = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
    this.total = this.val1+this.val2;
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
       duration: 6000,
       message: 'Wait..',
       translucent: true,
       cssClass: 'custom-class custom-loading'
     });
     return await loading.present();
  }

}
