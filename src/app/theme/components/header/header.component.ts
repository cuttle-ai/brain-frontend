import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../../theme';

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

  @Input()
  theme: Theme;

  constructor() { }

  ngOnInit() {
  }

}
