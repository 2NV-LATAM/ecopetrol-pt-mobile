import { Component, OnInit, OnDestroy } from "@angular/core";
import { FaqService } from "../services/shared/faq.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.page.html",
  styleUrls: ["./faq.page.scss"]
})
export class FaqPage implements OnInit, OnDestroy {
  /**
   * Reference subscription subject
   */
  private _unsubscribeAll: Subject<any>;
  /**
   * All Categories
   */
  public FAQsCategories: Array<any> = [];
  /**
   * Constructor
   * @param faqService
   * @param _router
   */
  constructor(public faqService: FaqService, private _router: Router) {}

  ngOnInit() {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    // Gets all categories
    this.faqService.getFAQCategories();

    this.faqService.FAQCategories
      // condition for subscription
      .pipe(takeUntil(this._unsubscribeAll))
      // subscribe
      .subscribe(data => {
        //assign categories
        this.FAQsCategories = data;
      });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    // complete this subject
    // and kill all subscriptions
    this._unsubscribeAll.complete();
  }

  /**
   * open FAQs of a category
   * @param category object
   */
  public FAQDetails(category: any): void {
    this.faqService.setFAQCategorySelected = category.id;
    this._router.navigate(["faq-category-preview/"]);
  }
}
