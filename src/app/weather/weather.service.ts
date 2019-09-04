import { Injectable } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class WeatherService {
  /**
   * Used to storage the current latitude
   */
  private latitude: string;
  /**
   * Used to storage the current longitude
   */
  private longitude: string;
  /**
   * Keeper of weather information
   */
  private $weather_info: BehaviorSubject<any>;
  /**
   *  Weather information
   */
  public weather_info: Observable<any>;
  /**
   * ApiKey to use weather map
   * you can get with an `openweathermap` account
   */
  readonly appId: string = "8581e5f4667acea0a6eefd7b19547122";
  /**
   * Constructor
   * @param geo
   * @param _httpClient
   */
  constructor(private _httpClient: HttpClient, private geo: Geolocation) {
    // Get current location
    this.getCurrentLocation();

    // Initial state for weather information
    this.$weather_info = new BehaviorSubject(null);

    // Converts as a observable
    this.weather_info = this.$weather_info.asObservable();
  }

  /**
   * getWeather
   *
   * Request to `openweathermap` api to get the weather according
   * current location. `lat` `and` long are required parameters.
   * @param lat
   * @param long
   */
  private getWeather(lat: string, long: string): void {
    let params = new HttpParams()
      .set("lat", lat)
      .set("lon", long)
      .set("appid", this.appId);

    this._httpClient
      .get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: params
      })
      .subscribe(
        httpResponse => {
          console.log(httpResponse);
          // save weather information
          this.$weather_info.next(httpResponse);
        },
        httpErrorResponse => {
          // On an error response
          console.log(httpErrorResponse);
        }
      );
  }

  /**
   * getCurrentLocation
   *
   * Returns the device's current position. If there is an error,
   * the `geolocationError` callback is passed a `PositionError` object.
   */
  private getCurrentLocation(): void {
    this.geo
      .getCurrentPosition({
        maximumAge: 1000,
        timeout: 5000,
        enableHighAccuracy: true
      })
      .then((resp: any) => {
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        // console.log(resp);

        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        // Ask for the weather
        //this.getWeather(this.latitude, this.longitude);
      })
      .catch(error => {
        // onError Callback receives a PositionError object
        console.log("Error getting location");
        console.log(JSON.stringify(error));
      });
  }
}
