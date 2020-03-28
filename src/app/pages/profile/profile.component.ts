import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { LightTheme, Theme } from 'src/app/theme/theme';
import { HttpService, SessionService } from 'src/app/core/services';

@Component({
  selector: 'brain-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {

  /**
   * theme determnines the theme of the login page
   */
  @Input()
  theme: Theme = new LightTheme();

  /**
   * style of the page
   */
  style: object = {
    BACKGROUND: {
      'background-color': this.theme.PrimaryBackgroundColor
    }
  }

  /**
   * constructor does required initialization of the registration component class
   * It will redirect from registration screen to the home if user is already registered
   * @param http http service instance of the application
   */
  constructor(private http: HttpService, private session: SessionService, private router: Router) { }

  /**
   * will unsubscribe to all the observers
   */
  ngOnDestroy() { }

}
