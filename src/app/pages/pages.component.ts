import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HttpService, SessionService } from '../core/services';
import { DarkTheme } from '../theme/theme';

/**
* PagesComponent bootstraps the pages in the application.
* The session check is done at this level.
*/
@Component({
  selector: 'brain-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy{
  /**
  * sessIns is the session instance of the application.
  * This is subscribed to the session changes of the session service
  * If when session become false, it will load the login page
  */
  sessIns: Subscription;
  
  /**
  * sessionEnabled flag indicate whether the session is enabled or not.
  */
  sessionEnabled: boolean;
  
  /**
  * themes is the object with keys as the page names mapped to the theme to applied to the page. 
  */
  themes= {
    HEADER: new DarkTheme()
  }
  
  /**
  * constructor of the pages component. It do require the following services to be inited before this component.
  * @param http http service of the application
  * @param session session service of the application
  * @param router router of the angular
  */
  constructor(private http: HttpService, private session: SessionService, private router: Router) {}
  
  /**
  * We will check whether the session is enabled or not. if not enabled will logout.
  * We will basically subscribe to the session service for the same. So that any changes can dynamically can addressed.
  */
  ngOnInit() {
    this.sessIns = this.session.session().subscribe(isEnabled => {
      this.sessionEnabled = isEnabled;
      if(!this.sessionEnabled) {
        this.router.navigate(['pages', 'login']);
      }
    })
  }
  
  /**
  * We will unsubscribe to the session service
  */
  ngOnDestroy() {
    this.sessIns.unsubscribe();
  }
}
