import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  getAccessToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.AccessToken;
  }

  getUserInfo() {
    return localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : null;
  }

  getReferenceMonth(): string {
    const MONTHS = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return `${MONTHS[new Date().getMonth()]}/${new Date().getFullYear()}`;
  }
}
