import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(public _api:ApiService, public storage : Storage) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this.storage.get('history')
  }
}
