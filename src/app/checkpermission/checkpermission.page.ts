import { Component, OnInit } from '@angular/core';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  PermissionType
} from '@capacitor/core';
import { NewapiService } from '../newapi.service';
import { RouteConfigLoadEnd, Router } from '@angular/router';

const { Geolocation, Permissions } = Plugins;

@Component({
  selector: 'app-checkpermission',
  templateUrl: './checkpermission.page.html',
  styleUrls: ['./checkpermission.page.scss'],
})
export class CheckpermissionPage implements OnInit {

  currentLocation = null;
  permition = null;

  constructor(private _api: NewapiService, private router: Router) { }

  ngOnInit() {
    this.devicekCurrentLocation()
  }
  async devicekCurrentLocation() {

   this.permition = await Permissions.query({ name: PermissionType.Geolocation }).then( async v=>{
      this.currentLocation = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 1000
      });
      this._api.currentLocationLatNext(this.currentLocation.coords.latitude);
      this._api.currentLocationLongNext(this.currentLocation.coords.longitude);
      this.router.navigate(['tab/home/landing'], { replaceUrl: true })
    }).catch( async (er)=>{
         await Permissions.requestPermissions().then( async v=>{
            this.devicekCurrentLocation()
         },async er=>{
          this.devicekCurrentLocation()
         } )
    });



  }
 async retry(){
    await Permissions.requestPermissions().then( async v=>{
      this.devicekCurrentLocation()
   },async er=>{
    this.devicekCurrentLocation()
   } )

  }
}
