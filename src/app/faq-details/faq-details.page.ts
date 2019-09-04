import { Component, OnInit } from "@angular/core";
import { FaqService } from "../services/shared/faq.service";

@Component({
  selector: "app-faq-details",
  templateUrl: "./faq-details.page.html",
  styleUrls: ["./faq-details.page.scss"]
})
export class FaqDetailsPage implements OnInit {
  /**
   * All Categories
   */
  public FAQsCategories: Array<any> = [];

  constructor(private faqService: FaqService) {}

  ngOnInit() {}
}
