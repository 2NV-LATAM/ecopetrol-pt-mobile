import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class MsgBoxService {
  constructor(private alert: AlertController) {}

  /**
   * alert message
   */
  async confirm(header: string, msg: string) {
    const alert = await this.alert.create({
      header: header,
      message: msg,
      buttons: [{ text: "ok" }]
    });
    await alert.present();
  }
}
