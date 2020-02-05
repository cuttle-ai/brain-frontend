import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Theme, LightTheme } from 'src/app/theme/theme';
import { HttpService } from 'src/app/core/services';
import { FileUpload, FileUploadError } from 'src/app/core/models';

@Component({
  selector: 'brain-datasets',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {


  /**
   * theme determnines the theme of the login page
   */
  @Input()
  theme: Theme = new LightTheme();

  /**
   * fileUploads has the list of file uploads in the system
   */
  fileUpload: FileUpload;

  /**
   * Errors has the list errors found while uploading the file
   */
  fileUploadErrors: FileUploadError[];

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
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpService) {
  }

  ngOnInit() {
    this.http.get({
      hash: 'FILEUPLOAD', params: new Map<string, string>([
        ['id', this.route.snapshot.paramMap.get("id")],
      ]),
    }).subscribe((resp) => {
      this.fileUpload = resp.Data.Info;
      this.fileUploadErrors = resp.Data.Errors;
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
