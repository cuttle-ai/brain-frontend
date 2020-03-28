import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService, HttpService } from 'src/app/core/services';
import { Theme, DarkTheme } from 'src/app/theme/theme';
import { Profile } from 'src/app/core/models';

/**
 * Header component has the header component of the brainm application
 * 
 * @example :-
 *      <brain-header
 *                   [theme]=darkTheme>
 *      </brain-header>
 */
@Component({
  selector: 'brain-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * theme is the theme of the header
   */
  @Input()
  theme: Theme = new DarkTheme();

  /**
   * profile is the profile of the user
   */
  profile: Profile;

  /**
   * profileOptions flag enables and disables the profile options menu for a logged in user
   */
  profileOptions: boolean;

  /**
   * menuOptions flag enables and disables the navigation menu
   */
  menuOptions: boolean;

  constructor(private session: SessionService, private http: HttpService, private router: Router) {
  }

  /**
   * viewOptions will toggle the options menu for the logged user
   */
  viewOptions() {
    this.profileOptions = !this.profileOptions;
  }

  /**
   * viewMenu will toggles the navigation menu
   */
  viewMenu() {
    this.menuOptions = !this.menuOptions;
  }

  /**
   * logout logs the user out of the appliation
   */
  logout() {
    /*
     * We will disable the profile view options
     * We will first hit the logout api
     * Then we will invalidate the session
     */
    this.profileOptions = false;
    this.http.post({
      hash: 'LOGOUT'
    }).subscribe(() => {
      this.session.setAuthToken('');
      this.session.setProfile(undefined);
    })
  }

  /**
   * naviagteTo function will natvigate to the given url
   * 
   * @param {string[]} link will navigate to the given link
   */
  navigateTo(link: string[]) {
    /*
     * We will disble the menu and do a navigation
     */
    this.profileOptions = false;
    this.menuOptions = false;
    this.router.navigate(link);
  }

  ngOnInit() {
    this.session.profile().subscribe((p: Profile) => {
      this.profile = p;
    });
  }

}
