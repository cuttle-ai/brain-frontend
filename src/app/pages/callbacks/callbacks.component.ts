import { Component, OnInit, Input } from '@angular/core';
import { DarkTheme, Theme } from 'src/app/theme/theme';

@Component({
  selector: 'brain-callbacks',
  templateUrl: './callbacks.component.html',
  styleUrls: ['./callbacks.component.scss']
})
export class CallbacksComponent implements OnInit {

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
      'background-image': 'linear-gradient(' + this.theme.PrimaryBackgroundColor + ',' + this.theme.SecondaryBackgroundColor + ')'
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

  constructor() { }

  ngOnInit() {
  }
}
