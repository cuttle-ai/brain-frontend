import { Component, OnInit } from "@angular/core";
import QueryResult from "@cuttleai/visualizations/lib/models/query";
import { Property } from "../../../core/models";

import { HttpService } from "src/app/core/services";

/**
 * SearchComponent is the search bar for the main app
 *
 * @example
 *          <brain-search>
 *          </brain-search>
 */
@Component({
  selector: "brain-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  /**
   * focusState has the searchbox focused state stored in it
   */
  focusState: boolean = false;
  /**
   * loading indicates whether the network request is being done
   */
  loading: boolean = false;
  /**
   * searchStr stores the string being searched
   */
  searchStr: string = "";

  /**
   * queryResult stores the result of a search query
   */
  queryResult: QueryResult;

  constructor(private http: HttpService) {}

  ngOnInit() {}

  /**
   * focus will set the focusState of the search component with the given state
   * @param state current state to be set for the focused state
   */
  focus(state: boolean) {
    this.focusState = state;
  }

  /**
   * keyup is invoked when the user starts typing something on the search bar
   * @param evt keyboard event triggered when user type down a key on the keyboard
   */
  keyup(evt: KeyboardEvent) {
    /*
     * When esacpe key is pressed, we remove the focus state
     * When anything other than return is pressed, we will just save the search string
     * If return key is pressed, we will search
     */
    //checkoing for escape key
    if (evt.keyCode === 27) {
      this.focusState = false;
      return;
    }

    this.searchStr = evt.target["value"];
    //anythign other than return key
    if (evt.keyCode !== 13) {
      return;
    }

    //performs a search
    this.search();
  }

  search() {
    /**
     * We will keep the focus as true
     * Then we will search for the existing string in the search bar
     */
    this.focus(true);
    this.loading = true;
    this.http
      .post({
        hash: "SEARCH",
        body: { nl: this.searchStr },
      })
      .subscribe(
        (resp) => {
          this.loading = false;
          this.queryResult = resp.Data;
        },
        (err) => {
          this.loading = false;
        }
      );
  }

  /**
   * this method is changed when any of the property of the query is changed
   * @param property property that is changed
   */
  propertyChanged(property: Property) {
    this.queryResult = Object.assign({}, this.queryResult, {
      [property.name]: property.value,
    });
  }
}
