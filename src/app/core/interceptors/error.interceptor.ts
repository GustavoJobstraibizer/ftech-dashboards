import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('portal/autenticacao/refresh')) {
      return next.handle(req);
    } else {
      return next.handle(req).pipe(
        catchError((err) => {
          debugger;
          if (
            err.status === 401 ||
            (err.status === 0 && localStorage.getItem('currentUser'))
          ) {
            this.authService
              .refreshAccess()
              .pipe(
                catchError(() => {
                  return next.handle(req);
                })
              )
              .subscribe(
                (response) => {
                  if (response && response['body']) {
                    localStorage.removeItem('currentUser');
                    localStorage.setItem(
                      'currentUser',
                      JSON.stringify(response['body'])
                    );
                    return next.handle(
                      this.addAuthHeader(req, response['body'].AccessToken)
                    );
                  } else {
                    this.authService.logout();
                  }

                  return next.handle(req);
                },
                () => {
                  const credentials = localStorage.getItem('_SSoQ');

                  if (credentials) {
                    const crendential = this.authService.decryptUsingAES256();
                    this.authService
                      .signIn({
                        Usuario: crendential[0],
                        Senha: crendential[1],
                      })
                      .subscribe(
                        (responseSignIn) => {
                          localStorage.setItem(
                            'currentUser',
                            JSON.stringify(responseSignIn.body)
                          );

                          return next.handle(
                            this.addAuthHeader(
                              req,
                              responseSignIn.body.accessToken
                            )
                          );
                        },
                        () => {
                          this.authService.logout();
                          return next.handle(req);
                        }
                      );
                  }
                }
              );
            // this.authService.logout();
          }

          return throwError(err);
        })
      );
    }
  }

  addAuthHeader(request: HttpRequest<any>, token) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
}
