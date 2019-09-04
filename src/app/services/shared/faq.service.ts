import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EnvironmentService } from "../environment/environment.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FaqService {
  /**
   * Keeper of FAQCategories information
   */
  private $FAQCategories: BehaviorSubject<any>;
  /**
   * Keeper of FAQCategorySelected information
   */
  private $FAQCategorySelected: BehaviorSubject<any>;
  /**
   *  FAQCategories information
   */
  public FAQCategories: Observable<any>;
  /**
   *  FAQCategorySelected information
   */
  public FAQCategorySelected: Observable<any>;
  /**
   * FAQList
   */
  public FAQList: Array<any> = [];

  /**
   * Constructor
   *
   * @param _httpClient
   * @param _environment
   */
  constructor(
    private _httpClient: HttpClient,
    private _environment: EnvironmentService
  ) {
    // Initial state for FAQ Category selected
    this.$FAQCategorySelected = new BehaviorSubject(null);
    // Initial state for FAQs Categories
    this.$FAQCategories = new BehaviorSubject(null);
    // Converts as a observable
    this.FAQCategorySelected = this.$FAQCategorySelected.asObservable();
    // Converts as a observable
    this.FAQCategories = this.$FAQCategories.asObservable();
  }
  /**
   * getFAQCategories
   *
   * Gets FAQ categories from database
   */
  public getFAQCategories(): void {
    this._httpClient
      .get(`${this._environment.getHost}/api/faq/categories`)
      .subscribe(
        (httpResponse: Array<any>) => {
          console.log(httpResponse);
          // save FAQCategories information
          this.$FAQCategories.next(httpResponse);
        },
        httpErrorResponse => {
          // On an error response
          console.log(httpErrorResponse);
        }
      );
  }

  /**
   * getFAQByCategory
   *
   * Gets FAQ from database by category id
   */
  private getFAQByCategory(category_id: number): void {
    this._httpClient
      .get(`${this._environment.getHost}/api/faq/?category_id=${category_id}`)
      .subscribe(
        (httpResponse: any) => {
          console.log(httpResponse);
          this.FAQList = httpResponse;
        },
        httpErrorResponse => {
          // On an error response
          console.log(httpErrorResponse);
        }
      );
  }

  /**
   * Change the value of FAQ Category selected
   */
  public set setFAQCategorySelected(v: any) {
    this.$FAQCategorySelected.next(v);
    this.getFAQByCategory(v);
  }
}
