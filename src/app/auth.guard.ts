import { AlertController } from '@ionic/angular';
import { NewapiService } from './newapi.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _api: NewapiService, public alertController : AlertController) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise<any>((resolve, reject) => {

      return this._api.get_api().subscribe(val => { resolve(true) }, er => {
        this.fupdate();
        resolve(false);
      })

    })

  }


  async fupdate() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'It seems you are not connected to the internet. Please try again later.',
      backdropDismiss : false,
      buttons: [
        {
          text: 'Ok',
          cssClass: 'button success',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }


}
