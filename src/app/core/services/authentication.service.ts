import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Local } from 'protractor/built/driverProviders';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  secretKey = 'Ft3chT3chN@|@gy';
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(public http: HttpClient, private route: Router) {}

  signIn({ Usuario, Senha }) {
    return this.http
      .post<any>(
        `${environment.API.URL}${environment.API.Routes.auth.signin.post}`,
        { Usuario, Senha },
        { observe: 'response' }
      )
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user?.body?.Data));
          return user;
        })
      );
  }

  refreshToken(
    AccessToken: string,
    RefreshToken: string
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.API.URL}${environment.API.Routes.auth.refresh.post}`,
      { AccessToken, RefreshToken },
      { observe: 'response' }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.route.navigate(['/login']);
  }

  encryptUsingAES256(login: string, password: string) {
    const prepareToken = `#9${login}||${password}`;
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(prepareToken),
      this.secretKey
    );
    localStorage.setItem('_SSoQ', encrypted.toString());
  }

  decryptUsingAES256(): string[] {
    const bytes = CryptoJS.AES.decrypt(
      localStorage.getItem('_SSoQ'),
      this.secretKey
    );
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted.slice(3, decrypted.length - 1).split('||');
  }

  refreshAccess() {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return this.refreshToken(
        currentUser.AccessToken,
        currentUser.RefreshToken
      ).pipe(
        tap((data) => {
          console.log(data);
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        })
      );
    }
  }
}
