import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import _get from "lodash/get";
import { NbDialogService } from "@nebular/theme";
import * as moment from "moment";
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";

import { Theme, LightTheme } from "src/app/theme/theme";
import { HttpService } from "src/app/core/services";
import {
  Dataset,
  FileSources,
  FileUpload,
  FileUploadError,
  Column,
} from "src/app/core/models";
import { DatasetDialogComponent } from "./dataset-dialog/dataset-dialog.component";
import { DatasetUploadDialogComponent } from "./dataset-upload-dialog/dataset-upload-dialog.component";

@Component({
  selector: "brain-dataset",
  templateUrl: "./dataset.component.html",
  styleUrls: ["./dataset.component.scss"],
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
   * columns in the dataset
   */
  columns: Column[];

  /**
   * columnTableHeaders is the list of  header beloning to the table listing columns
   */
  columnTableHeaders: string[] = [
    "Name",
    "Data Type",
    "Default Aggregation Function",
  ];
  columnTableProps = {
    Name: "word",
    "Data Type": "data_type",
    "Default Aggregation Function": "aggregation_fn",
  };
  columnTableDataSource: NbTreeGridDataSource<Column>;
  columnTableSortColumn: string;
  columnTableSortDirection: NbSortDirection = NbSortDirection.NONE;

  /**
   * uploadedFile is the instance storing the uploaded file info
   */
  uploadedFile: FileUpload;

  /**
   * uploadedErrors is the instance storing the uploaded file errors
   */
  uploadedErrors: FileUploadError[];

  /**
   * updatedAt stores the last updated time in string format for the dataset
   */
  updatedAt: string;

  /**
   * _get is the lodash get function
   */
  _get: any;

  /**
   * style of the page
   */
  style: object = {
    BACKGROUND: {
      "background-color": this.theme.PrimaryBackgroundColor,
    },
  };

  /**
   * reupload is enabled when user click on upload button
   */
  reupload: boolean = false;

  /**
   * reuploadSource has the object containing the upload file type requirements like acceptedTypes, ID of etc
   */
  reuploadSource: any;

  /**
   * We will do the necessary initialisations required by this component
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private dialogService: NbDialogService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Column>
  ) {
    this._get = _get;
  }

  /**
   * loadDataset loads the dataset
   */
  loadDataset() {
    this.http
      .get({
        hash: "DATASET",
        params: new Map<string, string>([
          ["id", this.route.snapshot.paramMap.get("id")],
        ]),
      })
      .subscribe((resp) => {
        this.dataset = _get(resp, ["Data", "Dataset"], {});
        this.columns = _get(resp, ["Data", "Columns"], []);
        this.columnTableDataSource = this.dataSourceBuilder.create(
          this.columns.map((c) => ({ data: c }))
        );
        this.uploadedFile = _get(this.dataset, ["UploadedDataset", "Info"], {});
        this.uploadedErrors = _get(
          this.dataset,
          ["UploadedDataset", "Errors"],
          []
        );
        this.updatedAt = moment(
          _get(this.uploadedFile, "UpdatedAt")
        ).toString();
      });
  }

  ngOnInit() {
    this.loadDataset();
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.columnTableSortColumn = sortRequest.column;
    this.columnTableSortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.columnTableSortColumn === column) {
      return this.columnTableSortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  /**
   * openEditDialog opens the edit dialog for the dataset
   */
  openEditDialog() {
    this.dialogService
      .open(DatasetDialogComponent, {
        context: {
          dataset: JSON.parse(JSON.stringify(this.dataset)),
        },
      })
      .onClose.subscribe(this.loadDataset.bind(this));
  }

  /**
   * openUpdateConfirmDialog will open the confirmation dialog asking the user whether to append data or replace existing one
   * @param id id of the dataset id
   * @param sourceType source type of the dataset
   */
  openUpdateConfirmDialog(id: number, sourceType: string) {
    this.dialogService
      .open(DatasetUploadDialogComponent, {
        context: {
          id,
          sourceType,
        },
      })
      .onClose.subscribe((obj: any) => {
        if (!obj) {
          return;
        }
        this.openFileUploadModal(obj.id, obj.sourceType, obj.append);
      });
  }

  /**
   * openFileUploadModal will open file upload modal
   * @param id id of the file
   * @param sourceType sourceType of the file
   */
  openFileUploadModal(id: number, sourceType: string, append: boolean) {
    this.reuploadSource = Object.assign(
      {},
      {
        URL: "/datasourceapi/file/upload?id=" + id + "&append=" + append,
        acceptedFileTypes: _get(
          FileSources,
          [sourceType, "acceptedFileTypes"],
          []
        ),
      }
    );
    this.reupload = true;
  }

  /**
   * closeFileUploadModal will close the file upload modal
   */
  closeFileUploadModal() {
    this.reupload = false;
    this.reuploadSource = undefined;
  }

  /**
   * deleteDataset deletes the datasets
   */
  deleteDataset() {
    this.dialogService
      .open(DatasetDialogComponent, {
        context: {
          dataset: JSON.parse(JSON.stringify(this.dataset)),
          forDelete: true,
        },
      })
      .onClose.subscribe((cancel) => {
        if (cancel) {
          return;
        }
        this.navigateTo(["pages", "data"]);
      });
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
