import { Injectable } from "@angular/core";
import { EnvironmentService } from "../environment/environment.service";
import { accessTokenName, refreshTokenName } from "src/app/core/constant";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private _router: Router,
    private _environment: EnvironmentService
  ) {}

  /**
   * @name logout
   * @type Void
   * @description  Remove refresh token first so that it doesn't refresh with the subscription
   */
  public logout() {
    this.removeRefreshToken();
    this.removeAccessToken();
    this._router.navigate(["account/login"]);
  }
  /**
   * @name getAccessToken
   * @type string
   * @description Gets the access token  from localStorage
   * @returns An access token
   */
  public get getAccessToken(): string {
    return localStorage.getItem(accessTokenName);
  }

  /**
   * @name setAccessToken
   * @type viod
   * @param accessToken access token to be saved
   */
  public setAccessToken(accessToken): void {
    localStorage.setItem(accessTokenName, accessToken);
  }

  /**
   * @name removeAccessToken
   * @type void
   * @description Remove access token from localStorage
   */
  public removeAccessToken(): void {
    localStorage.removeItem(accessTokenName);
  }

  /**
   * @name getRefreshToken
   * @type string
   * @description Gets the refresh token from localStorage
   */
  public get getRefreshToken(): string {
    return localStorage.getItem(refreshTokenName);
  }

  /**
   * @name setRefreshToken
   * @type viod
   * @param refreshToken Refresh token to be saved
   */
  public setRefreshToken(refreshToken): void {
    localStorage.setItem(refreshTokenName, refreshToken);
  }

  /**
   * @name removeRefreshToken
   * @type void
   * @description Remove refresh token from localStorage
   */
  public removeRefreshToken(): void {
    localStorage.removeItem(refreshTokenName);
  }
}
