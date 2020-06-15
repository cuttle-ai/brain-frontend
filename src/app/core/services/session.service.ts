import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Profile } from "../models";
import { WebSocketsService } from "./websockets.service";

/**
 * SessionService provides the utilities for proving the session accross the application
 */
@Injectable({
  providedIn: "root",
})
export class SessionService {
  /**
   * AuthHeader is the header to be used for setting the auth token while hitting the api
   */
  static AuthHeader = "auth-token";

  /**
   * sessionSet is flag indicating whether the session for the application is set or not
   */
  private sessionSet = false;

  /**
   * sessionEmit emits the session information to the subscribers
   */
  private sessionEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * profileSet is flag indicating whether the profile of the user is set or not
   */
  private profileSet = false;

  /**
   * profileEmit emits the profile information to the subscribers
   */
  private profileEmit: EventEmitter<Profile> = new EventEmitter<Profile>();

  /**
   * profileInfo is the variable storing the profile information about the user
   */
  private profileInfo: Profile;

  /**
   * authToken is the authentication token to be used for accessing the api
   */
  private authToken: string = "";

  /**
   * @param webSockets websockets service for the application
   */
  constructor(private webSockets: WebSocketsService) {}

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
    this.sessionEmit.emit(
      this.authToken && this.authToken.length > 0 ? true : false
    );
    this.webSockets.setupSocketConnection();
  }

  /**
   * session returns an observable stating whether the session exists or not.
   * This function will wait for the first time to get the session set and let
   * it's subscriber known whenever the session information changes.
   */
  session(): Observable<boolean> {
    /*
     * If the session is already not set we will create an observable that emits the session when
     * the sessionEmit event emitter emits the session information change
     * If the session is already set we will create an observable that emits the session when
     * the sessionemit event emitter emits the session information change. Also will emit the current session information.
     */
    //when the session is not set simply create the observable that is subscribed to the session event emiter
    if (!this.sessionSet) {
      let ob = Observable.create((observer) => {
        this.sessionEmit.subscribe((sess: boolean) => {
          observer.next(sess);
        });
      });
      return ob;
    }

    //if the session is already set create the observale that by default emits the session information along with the subscription to the event emiter;
    let ob = Observable.create((observer) => {
      observer.next(this.authToken && this.authToken.length > 0 ? true : false);
      this.sessionEmit.subscribe((sess: boolean) => {
        observer.next(sess);
      });
    });
    return ob;
  }

  /**
   * setProfile sets the profile information of the user.
   * This method will also emit the profile that has been set to the subscribers of the profile method of
   * the service.
   * @param profile profile information of the user
   */
  setProfile(profile: Profile) {
    this.profileInfo = profile;
    this.profileSet = true;
    this.profileEmit.emit(profile);
  }

  /**
   * profile returns an observable of the profile information.
   * This function will directly give the profile information if set.
   * Else it will let the subcscriber know about the profile info change when profile info is set.
   */
  profile(): Observable<Profile> {
    /*
     * If the profile is already not set we will create an observable that emits the profile when
     * the profileEmit event emitter emits the profile information.
     * If the profile is already set we will create an observable that emits the profile when
     * the profileEmit event emitter emits the profile information change. Also will emit the current profile information.
     */
    //when the profile is not set simply create the observable that is subscribed to the profile event emiter
    if (!this.profileSet) {
      let ob = Observable.create((observer) => {
        this.profileEmit.subscribe((profile: Profile) => {
          observer.next(profile);
        });
      });
      return ob;
    }

    //if the profile is already set create the observale that by default emits the profile information along with the subscription to the event emiter;
    let ob = Observable.create((observer) => {
      observer.next(this.profile);
      this.profileEmit.subscribe((profile: Profile) => {
        observer.next(profile);
      });
    });
    return ob;
  }
}
