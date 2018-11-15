import { Component, OnInit, Input } from '@angular/core';

import { SessionService, HttpService } from '../../../core/services';
import { Theme, DarkTheme } from '../../theme';
import { Profile } from 'src/app/core/models';

/**
 * Header component has the header component of the brainm application
 * 
 * usage :-
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

  constructor( private session: SessionService, private http: HttpService) { 
    session.profile().subscribe((p:Profile) => {
      this.profile = p;
    });
  }
  
  /**
   * viewOptions will toggle the options menu for the logged user
   */
  viewOptions() {
    this.profileOptions = !this.profileOptions;
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

  ngOnInit() {
  }

}
