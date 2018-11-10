import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HttpService, SessionService } from '../core/services';
import { DarkTheme, LightTheme } from '../theme/theme';

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
  * sessionSet flag indacates whether the session information is set atlease once.
  */
  sessionSet: boolean;
  
  /**
  * profileIns is the profile instance of the application.
  * This is subscribed to the profile changes of the session service
  */
  profileIns: Subscription;
  
  /**
  * sprofileSet flag indacates whether the profile information is set atlease once.
  * Based on this flag we will subscribe to the profile changes event.
  */
 profileSet: boolean;
  
  /**
  * registered flag indicates whether the user is registered with the platform or not.
  */
  registered: boolean;
  
  /**
  * themes is the object with keys as the page names mapped to the theme to applied to the page. 
  */
  themes= {
    '/': new DarkTheme(),
    '/pages': new DarkTheme(),
    '/pages/login': new DarkTheme(),
    '/pages/register': new LightTheme(),
    PUBLIC: new DarkTheme(),
  }
  
  /**
  * style has the styling configuration for
  *  * background particles
  *  * auth container
  * These styles are configured as per theme styling
  */
  styles: object = {
    background: {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'background-image': 'linear-gradient('+this.themes.PUBLIC.PrimaryBackgroundColor+','+this.themes.PUBLIC.SecondaryBackgroundColor+')'
    },
    backgroundWidth: 100,
    backgroundHeight: 100,
    backgroundParams: {
      particles: {
        number: {
          value: 160,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: this.themes.PUBLIC.PrimaryForegroundColor
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#ffffff'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 10,
            size_min: 0.1,
            sync: false
          }
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'top',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        },
        line_linked: {
          enable: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          bubble: {
            distance: 800,
            size: 80,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 300,
            duration: 0.4
          }
        }
      },
      retina_detect: true
    },
    authBrand: {
      'color': this.themes.PUBLIC.PrimaryForegroundColor
    },
    authSeparator: {
      'background-color': this.themes.PUBLIC.PrimaryForegroundColor
    },
    authBtn: {
      'background-color': this.themes.PUBLIC.PrimaryForegroundColor,
      'color': this.themes.PUBLIC.SecondaryBackgroundColor
    }
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
      /*
      * Will set the sesion enabled flag with enabled state argument
      * Will set the session set flag as true
      * If the session is not enabled will route the login page
      * If session is enabled and not subscribed to profile change we will subscribe to the profile info of the user
      * We will get the profile info and set it in the session service
      * If the is not yet registered with the application we will route the user to the registeration page
      */
      this.sessionEnabled = isEnabled;
      this.sessionSet = true;
      if(!this.sessionEnabled) {
        this.router.navigate(['pages', 'login']);
        return;
      }

      if(!this.profileSet) {
        this.profileIns = this.session.profile().subscribe(profile => {
          /*
           * We will check whether the user is registered or not.
           * If not registered we will navigate to the registeration page
           */
           if(!profile.Registered) {
             this.router.navigate(['pages', 'register']);
           }
        });
      }

       //user is logged in. let's get the profile info and set it in the session
       this.http.get({hash: 'PROFILE'}).subscribe( profile => {
         this.session.setProfile(profile);
       });
    });
  }
  
  /**
  * We will unsubscribe to the session service
  */
  ngOnDestroy() {
    this.sessIns.unsubscribe();
    this.profileIns.unsubscribe();
  }
}
