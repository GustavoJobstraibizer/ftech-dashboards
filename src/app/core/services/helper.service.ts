import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor() {}

  getAccessToken(): string {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser.accessToken;
  }
}
