import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Store } from '@ngxs/store';
import { ILoginResult } from '../type';


@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  private csrf: string;

  constructor(private  store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.store.selectSnapshot<string>((state: {auth:ILoginResult}) => state.auth!?.token);
    if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    
    if(this.csrf) {
      request = request.clone({ headers: request.headers.set('X-XSRF-TOKEN', this.csrf)})
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    request = request.clone({ withCredentials: true });

    return next.handle(request).pipe(
      tap(r => {
        if(r instanceof HttpResponse) {
          this.csrf = r.headers.get("XSRF-TOKEN")
       }
      })
    );
  }
}

export const LoadingHttpClientInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpClientInterceptor,
  multi: true,
};