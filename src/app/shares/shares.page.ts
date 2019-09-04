import { Component, OnInit } from "@angular/core";
import { SharesService } from "./shares.service";
@Component({
  selector: "app-shares",
  templateUrl: "./shares.page.html",
  styleUrls: ["./shares.page.scss"]
})
export class SharesPage implements OnInit {
  /**
   * Constructor
   * @param sharesServ
   */
  constructor(public sharesServ: SharesService) {}

  ngOnInit() {}
}
