import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  getAccessToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return currentUser.AccessToken
  }

  getUserInfo() {
    return localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : null
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
    ]
    return `${MONTHS[new Date().getMonth()]}/${new Date().getFullYear()}`
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
