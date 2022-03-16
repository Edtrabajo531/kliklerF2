import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subscriber, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthInterceptorService implements HttpInterceptor {
  urlLogin = '/inicio-de-sesion';
  auth: any;
  refresh: boolean = false;
  tokenIntercept = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrS: ToastrService,
    private authS: AuthService,

    @Inject(PLATFORM_ID) private platformid: any
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    // return <any>next.handle(request);

    this.auth = this.authService.getAuth();

    if (this.auth) {
      request = req.clone({
        setHeaders: { authorization: `Bearer ${this.auth["token"]}` },
      });
    } else {
      request = req.clone({
        setHeaders: { authorization: `Bearer` },
      });
    }

    return <any>next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
       
        if (err.status === 401) {
          if (!request.url.includes('iniciar-sesion')) {
            if (err.error.message == 'role-sin-permisos') {
              this.toastrS.warning('No tiene permisos para ejecutar esta acción.')
              this.router.navigateByUrl("/");
            }else if (err.error.message == 'usuario-bloqueado') {
              this.toastrS.warning('Su cuenta ha sido bloqueada.');
              this.authS.logout();
              // this.router.navigateByUrl("/");
            }else if (err.error.message == 'sin-plan') {
                this.router.navigateByUrl("/planes");
            } else {
              this.toastrS.warning('Su sesión ha expirado.');
              this.authS.logout();
            }

          }
        }
        return throwError(err);
      })
    );
  }
}
