import { Injectable } from '@angular/core';

/**
 * ConfigService has the configuration utilities required for the application
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /**
   * api has the url and param configurations required for hitting an api
   */
  static api: Map<string, APIRequest> = new Map<string, APIRequest>([
    ['SESSION', {
      url: '/authapi/App/Session',
      params: new Map<string, Param>([])
    }],
    ['AUTHURLS', {
      url: '/authapi/App/AuthUrls',
      params: new Map<string, Param>([])
    }],
    ['PROFILE', {
      url: '/authapi/App/Profile',
      params: new Map<string, Param>([])
    }],
    ['REGISTER', {
      url: '/authapi/App/Register',
      params: new Map<string, Param>(
        [
          ['agree', { name: 'agree' }],
          ['subscribe', { name: 'subscribe' }],
        ]
      )
    }],
    ['LOGOUT', {
      url: '/authapi/App/Logout',
      params: new Map<string, Param>([])
    }]
  ]);
}

//APIRequest is the request to be send for hitting the api
export interface APIRequest {
  //url is the url of the api
  url: string;
  //params is the map of the param mapped to a string key.
  //advantage of this model is that, even if the name of the api param changes
  //the code business logic in the code need not be changed.
  //Just the configuration change would be sufficient.
  params: Map<string, Param>;
}

/**
 * Param is the parameter to be sent with a api request
 */
export interface Param {
  //name is the name of the parameter
  name: string;
  //value is the value of the parameter
  value?: string;
}
