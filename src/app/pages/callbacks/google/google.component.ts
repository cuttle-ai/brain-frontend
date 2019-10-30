import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { HttpService, SessionService } from 'src/app/core/services';

/**
 * GoogleComponent has the google oauth callback page.
 */
@Component({
  selector: 'brain-callback-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit, OnDestroy {
  /**
  * sessIns is the session instance of the application.
  * This is subscribed to the session changes of the session service
  * If when session become false, it will load the login page
  */
  sessIns: Subscription;

  /**
   * gotSessionInfo indicates that the login component got session enabled or not information at least once.
   */
  gotSessionInfo: boolean = false;

  /**
  * googleAuthIns is the auth url subscription instance.
  */
  googleAuthIns: Subscription;

  /**
   * constructor does required initialization of the login component class
   * It will redirect from login screen to the home if user is already logged in
   * @param http http service instance of the application
   */
  constructor(private http: HttpService, private session: SessionService, private router: Router, private route: ActivatedRoute) {
  }

  /**
   * we will get urls for oauth methods
   */
  ngOnInit() {
    /**
     * We will send the auth url and get complete the oauth
     * The will set the profile info. If unsuccessfull go to the login page
     * If session is established, will navigate to the home screen
     */
    //completing the oauth
    this.route.queryParams
      .subscribe(params => {
        this.googleAuthIns = this.http.get({
          hash: 'CALLBACKS_GOOGLE',
          params: new Map<string, string>([
            ['code', params.code],
          ]),
        }).subscribe(session => {
          this.session.setAuthToken(session.ID);

          //user is logged in. let's get the profile info and set it in the session
          this.http.get({ hash: 'PROFILE' }).subscribe(profile => {
            this.session.setProfile(profile);
          });

        }, err => {
          this.router.navigate(['pages', 'login']);
        });
      }, err => {
        this.router.navigate(['pages', 'login']);
      });

    //navigating to homepage if session is set
    this.sessIns = this.session.session().subscribe(isEnabled => {
      if (isEnabled) {
        this.router.navigate(['pages', 'home']);
        return;
      }
    });
  }

  /**
   * will unsubscribe to all the observers
   */
  ngOnDestroy() {
    this.sessIns.unsubscribe();
    this.googleAuthIns.unsubscribe();
  }
}
