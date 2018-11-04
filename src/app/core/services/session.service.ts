import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * SessionService provides the utilities for proving the session accross the application
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**
   * AuthHeader is the header to be used for setting the auth token while hitting the api
   */
  static AuthHeader = 'brain-auth';

  /**
   * sessionSet is flag indicating whether the session for the application is set or not
   */
  private sessionSet = false;

  /**
   * sessionEmit emits the session information to the subscribers
   */
  private sessionEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * authToken is the authentication token to be used for accessing the api
   */
  private authToken: string = '';

  /**
   * getAuthToken returns the authentication token available in the application
   */
  getAuthToken(): string {
    return this.authToken;
  }

  /**
   * setAuthToken sets the new auth token to the session
   * 
   * @param {string} token is the auth token to be set 
   */
  setAuthToken(token: string) {
    /*
     * We will set the session set flag as true
     * Then we will set the auth token
     * And then emits the session emit to let the subscribers know that session has been changed
     */
    this.sessionSet = true;
    this.authToken = token;
    this.sessionEmit.emit((this.authToken && this.authToken.length > 0?true: false))
  }

  /**
   * session returns an observable stating whether the session exists or not.
   * This function will wait for the first time to get the session set and let
   * it's subscriber known whenever the session information changes.
   */
  session() : Observable<boolean> {
    /*
     * If the session is already not set we will create an observable that emits the session when 
     * the sessionEmit event emitter emits the session information change
     * If the session is already set we will create an observable that emits the session when 
     * the sessionemit event emitter emits the session information change. Also will emit the current session information.
     */
    //when the session is not set simply create the observable that is subscribed to the session event emiter
    if(!this.sessionSet) {
      let ob = Observable.create((observer) => {
        this.sessionEmit.subscribe((sess: boolean) => {
          observer.next(sess);
        });
      });
      return ob;
    }

    //if the session is already set create the observale that by default emits the session information along with the subscription to the vent emiter;
    let ob = Observable.create((observer) => {
      observer.next((this.authToken && this.authToken.length > 0?true: false));
      this.sessionEmit.subscribe((sess: boolean) => {
        observer.next(sess);
      });
    });
    return ob;
  }
}
