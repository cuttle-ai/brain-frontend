import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';

import { Theme, LightTheme } from 'src/app/theme/theme';
import { HttpService } from 'src/app/core/services';
import { FileUpload } from 'src/app/core/models';

import { DatasetDialogComponent } from './dataset/dataset-dialog/dataset-dialog.component';

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
  constructor(private router: Router, private http: HttpService, private dialogService: NbDialogService) {
  }

  /**
   * loadDatasets loads the datasets for the user
   */
  loadDatasets() {
    this.http.get({ hash: 'DATASETS' }).subscribe((resp) => {
      this.fileUploads = resp.Data;
    })
  }

  ngOnInit() {
    this.loadDatasets()
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

  /**
   * deleteDataset deletes a dataset and all the data, info associated with the dataset
   * @param id id of the dataset
   */
  deleteDataset(id: number) {

    this.dialogService.open(DatasetDialogComponent, {
      context: {
        dataset: JSON.parse(JSON.stringify(this.fileUploads.find(item => item.ID === id))),
        forDelete: true,
      },
    }).onClose.subscribe(this.loadDatasets.bind(this));
  }

}
