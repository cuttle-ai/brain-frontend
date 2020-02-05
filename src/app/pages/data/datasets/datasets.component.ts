import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Theme, LightTheme } from 'src/app/theme/theme';
import { HttpService } from 'src/app/core/services';
import { FileUpload } from 'src/app/core/models';

@Component({
  selector: 'brain-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {


  /**
   * theme determnines the theme of the login page
   */
  @Input()
  theme: Theme = new LightTheme();

  /**
   * fileUploads has the list of file uploads in the system
   */
  fileUploads: FileUpload[];

  /**
   * search is the search string for the sources list
   */
  search: string = '';

  /**
   * style of the page
   */
  style: object = {
    BACKGROUND: {
      'background-color': this.theme.PrimaryBackgroundColor
    },
  }

  /**
   * We will do the necessary initialisations required by this component
   */
  constructor(private router: Router, private http: HttpService) {
  }

  ngOnInit() {
    this.http.get({ hash: 'FILEUPLOADS' }).subscribe((resp) => {
      this.fileUploads = resp.Data;
    })
  }

  /**
   * naviagteTo function will natvigate to the given url
   * 
   * @param {string[]} link will navigate to the given link
   */
  navigateTo(link: string[]) {
    /*
     * We will do a navigation
     */
    this.router.navigate(link);
  }

}
