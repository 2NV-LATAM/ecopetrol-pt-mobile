import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../services/auth/auth.service";
import { MsgBoxService } from "../services/utils/msg-box.service";
import { accessTokenName, refreshTokenName } from "../core/constant";
import { EnvironmentService } from "../services/environment/environment.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  /**
   * Login form with its fields.
   */
  public loginForm: FormGroup;
  /**
   * Used to show loading on login button
   */
  public loginBtnLoading: Boolean = false;
  /**
   * Constructor
   * @param _router
   * @param _auth
   * @param _httpClient
   * @param _environment
   * @param alert_controller
   * @param loading_controller
   */
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _httpClient: HttpClient,
    private _environment: EnvironmentService,
    private _msgBox: MsgBoxService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  /**
   * Set a credentials on server
   */
  public login(event: Event): void {
    // Cancels the event if it is cancelable
    event.preventDefault();
    // Stop the click event from bubbling to parent elements
    event.stopPropagation();
    // Show loading status
    this.loginBtnLoading = true;
    // Do a request
    this._httpClient
      .post(
        `${this._environment.getHost}/v1/login/access-token/`,
        this.loginForm.value
      )
      .subscribe(
        httpResponse => {
          // On a success response
          const accessToken = httpResponse[accessTokenName];
          const refreshToken = httpResponse[refreshTokenName];
          // Setting Access token
          this._auth.setAccessToken(accessToken);
          // Setting Refresh token
          this._auth.setRefreshToken(refreshToken);
          // clean login form
          this.loginForm.reset();
        },
        httpErrorResponse => {
          // On an error response
          this._msgBox.confirm("Error", "Password or username failed");
        }
      );
  }
}
