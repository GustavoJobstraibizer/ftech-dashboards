import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, switchMap, take } from 'rxjs/operators'
import { AuthenticationService } from './../services/authentication.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  )

  constructor(public authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('portal/autenticacao/refresh')) {
      return next.handle(req)
    } else {
      return next.handle(req).pipe(
        catchError((err) => {
          if (
            (err.error == null && err.status === 401) ||
            (err.status === 0 && localStorage.getItem('currentUser'))
          ) {
            if (!this.isRefreshing) {
              this.isRefreshing = true
              this.refreshTokenSubject.next(null)

              const currentUser = JSON.parse(
                localStorage.getItem('currentUser')
              )
              return this.authService
                .refreshToken(currentUser.AccessToken, currentUser.RefreshToken)
                .pipe(
                  catchError(() => {
                    const credentials = localStorage.getItem('_SSoQ')

                    if (credentials) {
                      const crendential = this.authService.decryptUsingAES256()
                      this.authService
                        .signIn({
                          Usuario: crendential[0],
                          Senha: crendential[1],
                        })
                        .subscribe(
                          (responseSignIn) => {
                            localStorage.setItem(
                              'currentUser',
                              JSON.stringify(responseSignIn.body.Data)
                            )

                            return next.handle(
                              this.addAuthHeader(
                                req,
                                responseSignIn.body.Data.accessToken
                              )
                            )
                          },
                          () => {
                            this.authService.logout()
                            return next.handle(req)
                          }
                        )
                    } else {
                      this.authService.logout()
                      return next.handle(req)
                    }
                  }),
                  switchMap((token: any) => {
                    this.isRefreshing = false
                    this.refreshTokenSubject.next(token.body['Data'])

                    localStorage.removeItem('currentUser')
                    localStorage.setItem(
                      'currentUser',
                      JSON.stringify(token.body['Data'])
                    )
                    return next.handle(
                      this.addAuthHeader(req, token.body['Data'].AccessToken)
                    )
                  })
                )
            } else {
              return this.refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((jwt) => {
                  return next.handle(this.addAuthHeader(req, jwt.AccessToken))
                })
              )
            }
          }

          return throwError(err)
        })
      )
    }
  }

  addAuthHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
  }
}
