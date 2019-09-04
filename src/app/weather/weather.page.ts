import { Component, OnInit, OnDestroy } from "@angular/core";
import { WeatherService } from "./weather.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.page.html",
  styleUrls: ["./weather.page.scss"]
})
export class WeatherPage implements OnInit, OnDestroy {
  public readonly degree_ref = 273.15;
  /**
   * Weather information
   */
  public weather: any = {};
  /**
   * Temperature information
   */
  public temp: any = null;
  /**
   * Used to show or hide loading weather information.
   */
  public loadingInfo: boolean = true;
  /**
   * Reference subscription subject
   */
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   */
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    // Subscribe to weather information
    this.weatherService.weather_info
      // condition for subscription
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if (!data) return;
        // Hide loading
        this.loadingInfo = false;
        // assign weather information
        this.weather = data;
        this.temp = this.weather.main.temp - this.degree_ref;
        this.temp = this.temp.toFixed(1);
      });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    // complete this subject
    // and kill all subscriptions
    this._unsubscribeAll.complete();
  }
}
