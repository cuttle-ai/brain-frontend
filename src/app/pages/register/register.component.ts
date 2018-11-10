import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { LightTheme, Theme } from 'src/app/theme/theme';
import { HttpService, SessionService } from 'src/app/core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  /**
   * sessIns is the session instance of the application.
   * This is subscribed to the profile changes of the session service
   * If when profile registration become false, it will load the registration page
   */
  sessIns: Subscription;

  /**
   * gotProfileInfo indicates that the registration component got profile enabled or not information at least once.
   */
  gotProfileInfo: boolean = false;

  /**
   * theme determnines the theme of the login page
   */
  @Input()
  theme: Theme = new LightTheme();

  /**
   * agree is the model storing whether the user has agreed to the terms and conditions
   */
  agree: boolean = false;

  /**
   * subscribe is the models storing whether the user has subscribed to the newsletter
   */
  subscribe: boolean = false;

  /**
   * submitDisabled sets whether the submit button is disabled or not.
   * While submitting the forms this will come handy.
   */
  submitDisabled: boolean = false;

  /**
   * style of the page
   */
  style: object = {
    BACKGROUND: {
      'background-color': this.theme.PrimaryBackgroundColor
    },
    FORM: {
      'background-color': this.theme.PrimaryForegroundColor,
      'box-shadow': this.theme.ThemeShadow,
    }
  }

  /**
   * constructor does required initialization of the registration component class
   * It will redirect from registration screen to the home if user is already registered
   * @param http http service instance of the application
   */
  constructor(private http: HttpService, private session: SessionService, private router: Router) {
    /*
     * Will also subscribe to the session service
     */
    this.sessIns = this.session.profile().subscribe(profile => {
      this.gotProfileInfo = true;
      if(profile.Registered) {
        this.router.navigate(['pages', 'home']);
      }
    });
  }

  /**
   * will unsubscribe to all the observers
   */
  ngOnDestroy() {
    this.sessIns.unsubscribe();
  }

  /**
   * register is called when user submit the form
   */
  register() {
    /*
     * First we will check whether the user has agreed to the terms and conditions
     * Then we will disable the submit button.
     * send the post request
     * In the subscribers we will process the response from the server.
     */
    //First checking whether the user has aggreed to the terms and conditions
    if(!this.agree) {
      return;
    }
    //disabling the submit button
    this.submitDisabled = true;
    this.http.post({
      hash: 'REGISTER',
      params: new Map<string, string>([
        ['agree', this.agree+''],
        ['subscribe', this.subscribe+''],
      ])
    }).subscribe(resp => {
      /*
       * We will disable the submit button
       * Then we will check for error
       * Then we will navigate to the home page
       */
      this.submitDisabled = false;
      if(resp.Error) {
        return;
      }

      this.router.navigate(['pages', 'home']);
    }, resp => {
      /*
       * We will disable the submit button
       */
      this.submitDisabled = false;
    })
  }

}
