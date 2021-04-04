import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable , from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {

  constructor(public storage : Storage) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let promise = this.storage.get('lastdate');
    return from(promise).pipe(
      switchMap(token => {
        const url = request.url//+'?lastdate='+token;
          const reqClone = request.clone({
            url: url
          });
          return next.handle(reqClone);
      }));
    }
  }
 