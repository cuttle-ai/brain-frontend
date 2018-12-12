import { Component, OnInit, Input } from '@angular/core';

/**
 * PageComponent is the defines the page componentn required for brain app
 * 
 * @example
 *          <brain-page
 *                        [style]="{'font-size':'11px'}"
 *                        [title]="titleOfThePage">
 *          </brain-page>
 */
@Component({
  selector: 'brain-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor() { }

  /**
   * style rules of the page
   */
  @Input()
  style: object;

  /**
   * title of the page
   */
  @Input()
  title: string;

  ngOnInit() {
  }

}
