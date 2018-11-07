import { Component, OnInit, Input } from '@angular/core';
import { Theme, LightTheme } from 'src/app/theme/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /**
   * theme determnines the theme of the login page
   */
  @Input()
  theme: Theme = new LightTheme();

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

  constructor() { }

  ngOnInit() {
  }

}
