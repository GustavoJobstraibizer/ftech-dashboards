import { Injectable } from '@angular/core';

@Injectable()
export class UserblockService {
  public userBlockVisible: boolean;
  constructor() {
    // initially visible
    this.userBlockVisible = true;
  }

  getVisibility() {
    return this.userBlockVisible;
  }

  setVisibility(stat = true) {
    this.userBlockVisible = stat;
  }

  toggleVisibility() {
    this.userBlockVisible = !this.userBlockVisible;
  }

  getUserInfo() {
    const {
      EmailUsuario: emailUsuario,
      NomeUsuario: nomeUsuario,
      CodigoUsuario: codigoUsuario,
    } = JSON.parse(localStorage.getItem('currentUser'));
    return { emailUsuario, nomeUsuario, codigoUsuario };
  }
}
