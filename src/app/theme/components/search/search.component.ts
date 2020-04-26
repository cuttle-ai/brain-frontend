import { Component, OnInit } from '@angular/core';
import QueryResult from '@cuttleai/visualizations/lib/models/query';

import { HttpService } from 'src/app/core/services';

/**
 * SearchComponent is the search bar icon for the main app
 * 
 * @example
 *          <brain-search>
 *          </brain-search>
 */
@Component({
  selector: 'brain-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
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
  searchStr: string = '';

  queryResult: QueryResult;

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  /**
   * focus will set the focusState of the search component with the given state
   * @param state current state to be set for the focused state
   */
  focus(state: boolean) {
    this.focusState = state;
  }

  /**
   * keydown is invoked when the user starts typing something on the search bar
   * @param evt keyboard event triggered when user type down a key on the keyboard
   */
  keydown(evt: KeyboardEvent) {
    /*
     * When esacpe key is pressed, we remove the focus state
     * When anything other than return is pressed, we will just save the search string
     * If return key is pressed, we will search
     */
    //checkoing for escape key
    if (evt.keyCode === 27) {
      this.focusState = false;
      return
    }

    //anythign other than return key
    if (evt.keyCode !== 13) {
      this.searchStr = evt.target['value'];
      return;
    }

    //performs a search
    this.loading = true;
    this.http.post({
      hash: 'SEARCH', body: { nl: this.searchStr },
    }).subscribe((resp) => {
      this.loading = false;
      this.queryResult = resp.Data;
    })
  }
}
