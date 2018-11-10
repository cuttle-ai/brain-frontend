import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ConfigService, Param, APIRequest } from './config.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  /**
   * constructor initializes the http service. It will fetch the session information
   * when the application boots up.
   * @param http http client of the angular application
   * @param session session service of the application
   */
  constructor(private http: HttpClient, private session: SessionService) { 
    /*
     * We will check whether the session exists.
     * If session exists we will store the session's access token in the application variable
     * Else we will set the session service's access token as empty
     */
    this.get({
      hash: 'SESSION'
    }).subscribe(resp => {
      session.setAuthToken(resp.AccessToken);
    }, error => {
      console.log(error);
      session.setAuthToken('');
    })
  }
  
  /**
   * get is GET request for hitting resources/api 
   * 
   * @param {Request} req the request configuration required for hitting the api/resource
   */
  get(req: Request): Observable<any> {
    /*
     * We will find whether api do exist for the given hash of the request argument
     * We will set the parameters of the request
     * We will set the header for auth if available
     * We will set the loader if avalilable to loading state
     * We will add uncache mechanism
     * Then we will return the get request of http client piped with a transformation function.
     */
    //checking whether the api exists with the hash of the request
    let api = ConfigService.api.get(req.hash);
    if(!api) {
      return throwError('Could not find the api hash');
    }
    
    //variables for storing the request payload
    let params = this.getParams(req, api);
    
    //variable for storing header
    let header = {};

    //setting the headers
    header['Content-Type'] = 'application/x-www-form-urlencoded';
    //if session available will set the same
    if(this.session.getAuthToken().length > 0) {
      header[SessionService.AuthHeader] = this.session.getAuthToken();
    }
    let options = { headers: new HttpHeaders(header)};

    //joining the params
    options['params'] = params.map(p => p.name+'='+p.value).join('&');
    
    //setting the loader of the request
    if(req.loader) {
      req.loader.l[req.loader.p] = false;
    }
    
    //adding uncache mechanism
    api.url += '?nocache='+Date.now();
    
    return this.http.get(api.url, options).pipe(
      catchError.bind(this)(handleError({})),
      map(postApi.bind(req))
    );
  }
    
  /**
   * post is POST request for hitting resources/api 
   * 
   * @param {Request} req the request configuration required for hitting the api/resource
   */
  post(req: Request): Observable<any> {
    /*
     * We will find whether api do exist for the given hash of the request argument
     * We will set the parameters of the request
     * We will set the header for auth if available
     * We will set the loader if avalilable to loading state
     * We will add uncache mechanism
     * Then we will return the get request of http client piped with a transformation function.
     */
    //checking whether the api exists with the hash of the request
    let api = ConfigService.api.get(req.hash);
    if(!api) {
      return throwError('Could not find the api hash');
    }
      
    //variables for storing the request payload
    let params = this.getParams(req, api);
      
    //joining the params
    let body = params.map(p => p.name+'='+p.value).join('&');
      
    //variable for storing header
    let header = {};

    //setting the headers
    header['Content-Type'] = 'application/x-www-form-urlencoded';
    //if session available will set the same
    if(this.session.getAuthToken().length > 0) {
      header[SessionService.AuthHeader] = this.session.getAuthToken();
    }
    let options = { headers: new HttpHeaders(header)};
      
    //setting the loader of the request
    if(req.loader) {
      req.loader.l[req.loader.p] = false;
    }
      
    //adding uncache mechanism
    api.url += '?nocache='+Date.now();
      
    return this.http.post(api.url, body, options).pipe(
      catchError.bind(this)(handleError({})),
      map(postApi.bind(req))
    );
  }
      
  /**
      * 
      * @param {Request} req request from which the parameter values has to be taken. 
      * @param {APIRequest} api apirequest which ahs the parameter names of the api and the url 
      */
  getParams(req: Request, api: APIRequest): Param[] {
        /*
        * We will proceed only if there exist params
        * We will iterate through the params and add its value based on the parameter name.
        */
        let params: Param[] = [];
        
        //setting the parameters
        if(!req.params) {
          return params;
        }
        //we will iterate through the params given by the request and will find the corresponding params in the api
        for(let param of req.params.keys()) {
          //we have a valid parameter key. we will try to get it  from the api parameters map
          
          let apiPK = api.params.get(param);
          if(!apiPK) {
            //If couldn't find the api key in the api params, skip it
            continue;
          }
          //we also have api param key . now add it to the params
          params.push({name: apiPK.name, value: req.params.get(param)});
        }
        
        return params;
  }
}
    
/**
    * Request is the interface to be implemented by an object
    * to be a request for the HttpService
    */
export interface Request {
  //hash is the hash with which the request is declared in the config service
  hash: string;
  //params are the parameters to be passed on with the web request
  params?: Map<string, string>;
  //loader to be used while making the api request
  loader?: Loader;
}
    
/**
    * Loader has to be implemented by any object that represent a loader.
    * The p property of the l object will be set true by the http service.
    */
export interface Loader {
  l: any; //l is the loader object
  p: string; //p is the property of the loader to be set true after loading
}
    
/**
    * postApi intercepts the response from the get/post request.
    * It will do the session check and will disable the loader
    * @param res respones after the apio hit
    */
function postApi(res: any): any {
  /*
   * Will disable the loader
   * Will check whether the session is disabled or not. If so will inform the session service about the same.
   */
  if(this.loader){
   this.loader.l[this.loader.p] = true;
  }
  
  if(res && res.SessionExpired) {
    this.session.setAuthToken('');
  }
  
  return res;
}
    
/**
* handleError handles any error happening in the api hit
* @param result result is the result from the api
*/
function handleError<T> (result?: T) {
  /*
   * If the loader exist we will disable that
   */
  if(this && this.loader){
    this.loader.l[this.loader.p] = true;
  }

  return (error: any): Observable<T> => {
        
    console.error(error);
        
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}