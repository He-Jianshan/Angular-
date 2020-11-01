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
import { CookieService } from 'ngx-cookie';


@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  private csrf: string;

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('HttpClientInterceptor')
    const token: string = localStorage.getItem('token');

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
          console.log(this.csrf)
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