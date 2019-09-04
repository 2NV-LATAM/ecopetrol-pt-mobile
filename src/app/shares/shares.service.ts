import { Injectable } from "@angular/core";
import { EnvironmentService } from "../services/environment/environment.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SharesService {
  /**
   * Information about shares
   */
  public sharesInfo: any = {};

  constructor(
    private _httpClient: HttpClient,
    private _environment: EnvironmentService
  ) {}

  /**
   * getShares
   *
   * Request to get share information
   */
  public getShares(): void {
    this._httpClient
      .get(`${this._environment.getHost}/ecopetrol_shares/`)
      .subscribe(
        httpResponse => {
          // save share information
          this.sharesInfo = httpResponse;
        },
        httpErrorResponse => {
          // On an error response
          console.log(httpErrorResponse);
        }
      );
  }
}
