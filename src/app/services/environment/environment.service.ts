import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class EnvironmentService {
  constructor() {}

  public get getHost(): string {
    return environment.host;
  }

  public get isProduction(): boolean {
    return environment.production;
  }
}
