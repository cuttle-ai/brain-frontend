import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DarkTheme, Theme } from 'src/app/theme/theme';
import { HttpService, SessionService } from 'src/app/core/services';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

/**
 * LoginComponent has the login page. It will appear whenever the session is lost
 */
@Component({
  selector: 'brain-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
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
  * authUrlIns is the auth url subscription instance.
  */
 authUrlIns: Subscription;
 
  /**
   * theme determnines the theme of the login page
   */
  @Input()
  theme: Theme = new DarkTheme();
  
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
      'background-image': 'linear-gradient('+this.theme.PrimaryBackgroundColor+','+this.theme.SecondaryBackgroundColor+')'
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
          value: this.theme.PrimaryForegroundColor
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
      'color': this.theme.PrimaryForegroundColor
    },
    authSeparator: {
      'background-color': this.theme.PrimaryForegroundColor
    },
    authBtn: {
      'background-color': this.theme.PrimaryForegroundColor,
      'color': this.theme.SecondaryBackgroundColor
    }
  }

  /**
   * authUrls has the oauth urls to be hit
   */
  authUrls: object = {};
  
  /**
   * we will get urls for oauth methods
   */
  ngOnInit() {
    /**
     * We will get the auth url info from the backend
     */
    this.authUrlIns = this.http.get({
      hash: 'AUTHURLS'
    }).subscribe(urls => {
      this.authUrls = urls;
    });
  }

  /**
   * will unsubscribe to all the observers
   */
  ngOnDestroy() {
    this.authUrlIns.unsubscribe();
    this.sessIns.unsubscribe();
  }

  /**
   * constructor does required initialization of the login component class
   * @param http http service instance of the application
   */
  constructor(private http: HttpService, private session: SessionService, private router: Router) {
    /*
     * Will also subscribe to the session service
     */
    this.sessIns = this.session.session().subscribe(isEnabled => {
      this.gotSessionInfo = true;
      if(isEnabled) {
        this.router.navigate(['pages', 'home']);
      }
    });
  }
}
