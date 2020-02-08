import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash/get';
import { NbDialogService } from '@nebular/theme';

import { Theme, LightTheme } from 'src/app/theme/theme';
import { HttpService } from 'src/app/core/services';
import { Dataset } from 'src/app/core/models';
import { DatasetDialogComponent } from './dataset-dialog/dataset-dialog.component';

@Component({
  selector: 'brain-dataset',
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
   * dataset has the dataset object
   */
  dataset: Dataset;

  /**
   * _get is the lodash get function
   */
  _get: any;

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
  constructor(private route: ActivatedRoute, private http: HttpService, private dialogService: NbDialogService) {
    this._get = _get;
  }

  /**
   * loadDataset loads the dataset
   */
  loadDataset() {
    this.http.get({
      hash: 'DATASET', params: new Map<string, string>([
        ['id', this.route.snapshot.paramMap.get("id")],
      ]),
    }).subscribe((resp) => {
      this.dataset = _get(resp, 'Data', {});
    });
  }

  ngOnInit() {
    this.loadDataset();
  }

  /**
   * openEditDialog opens the edit dialog for the dataset
   */
  openEditDialog() {
    this.dialogService.open(DatasetDialogComponent, {
      context: {
        dataset: JSON.parse(JSON.stringify(this.dataset)),
      },
    }).onClose.subscribe(this.loadDataset.bind(this));
  }

  /**
   * validateFile sends a request to backend to validate an uploaded file
   * @param id of the uploaded file
   */
  validateFile(id: number) {
    this.http.get({
      hash: 'FILE_VALIDATE', params: new Map<string, string>([
        ['id', id + ''],
      ]),
    }).subscribe((resp) => {
    });
  }
}
