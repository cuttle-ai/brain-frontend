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
      url: '/authapi/auth/session',
      params: new Map<string, Param>([])
    }],
    ['AUTHURLS', {
      url: '/authapi/auth/urls',
      params: new Map<string, Param>([])
    }],
    ['CALLBACKS_GOOGLE', {
      url: '/authapi/auth/google',
      params: new Map<string, Param>([
        ['code', { name: 'code' }],
      ])
    }],
    ['PROFILE', {
      url: '/authapi/auth/profile',
      params: new Map<string, Param>([])
    }],
    ['REGISTER', {
      url: '/authapi/auth/register',
      params: new Map<string, Param>(
        [
          ['agree', { name: 'agree' }],
          ['subscribe', { name: 'subscribe' }],
        ]
      )
    }],
    ['LOGOUT', {
      url: '/authapi/auth/logout',
      params: new Map<string, Param>([])
    }],
    ['DATASETS', {
      url: '/datasourceapi/v1/datasets/list',
      params: new Map<string, Param>([])
    }],
    ['DATASET', {
      url: '/datasourceapi/v1/datasets/get',
      params: new Map<string, Param>([
        ['id', { name: 'id' }],
      ])
    }],
    ['DATASET_UPDATE', {
      url: '/datasourceapi/v1/dataset/update',
      params: new Map<string, Param>()
    }],
    ['FILE_VALIDATE', {
      url: '/datasourceapi/v1/file/validate',
      params: new Map<string, Param>([
        ['id', { name: 'id' }],
      ])
    }],
    ['FILE_COLUMN_PROCESS', {
      url: '/datasourceapi/v1/file/columns/process',
      params: new Map<string, Param>([
        ['id', { name: 'id' }],
      ])
    }],
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
