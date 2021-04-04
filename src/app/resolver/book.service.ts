import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NewapiService } from '../newapi.service';

@Injectable({
  providedIn: 'root'
})
export class BookService implements Resolve<any> {
  constructor(public _api:NewapiService, public routeb : ActivatedRoute) { }
  resolve(route: ActivatedRouteSnapshot) {
    let mod = route.paramMap.get('module');
    return this._api.books('?modules='+mod)
  }
}