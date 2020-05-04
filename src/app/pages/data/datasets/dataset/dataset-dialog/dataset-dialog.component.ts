import { Component, OnInit } from "@angular/core";
import { get as _get } from "lodash";

import { Dataset } from "src/app/core/models";
import { HttpService } from "src/app/core/services";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "brain-dataset-dialog",
  templateUrl: "./dataset-dialog.component.html",
  styleUrls: ["./dataset-dialog.component.scss"],
})
export class DatasetDialogComponent implements OnInit {
  /**
   * dataset being edited
   */
  dataset: Dataset;

  /**
   * disableUpdateBtn to disable the update button while network request
   */
  disableUpdateBtn: boolean = false;

  /**
   * _get is the lodash get function
   */
  _get: any;

  /**
   * error is the error happened while updatingt he form
   */
  error: string;

  /**
   * loading indicates that there is a network request going on
   */
  loading: boolean;

  /**
   * forDelete indicates that dialog is for deleting the dataset confirmation message
   */
  forDelete: boolean;

  /**
   * We will do the necessary initialisations required by this component
   */
  constructor(
    protected dialogRef: NbDialogRef<DatasetDialogComponent>,
    private http: HttpService
  ) {
    this._get = _get;
    this.dataset = _get(dialogRef, ["componentRef", "instance", "dataset"], {});
    this.forDelete = _get(
      dialogRef,
      ["componentRef", "instance", "forDelete"],
      false
    );
  }

  ngOnInit() {}

  /**
   * update is called when user clicks on the update button
   */
  update() {
    this.loading = true;
    this.http
      .post({
        hash: "DATASET_UPDATE",
        body: this.dataset,
      })
      .subscribe((resp) => {
        this.loading = false;
        this.error = _get(resp, ["error", "error"]);
        if (!this.error) {
          this.dialogRef.close();
        }
      });
  }

  /**
   * cancel is invoked when user clicks on the cancel button
   */
  cancel() {
    this.dialogRef.close(true);
  }

  /**
   * confirmDelete is invoked when the user confoirms to delete the dataset
   */
  confirmDelete() {
    this.loading = true;
    this.http
      .post({
        hash: "DATASET_DELETE",
        body: this.dataset,
      })
      .subscribe((resp) => {
        this.loading = false;
        this.error = _get(resp, ["error", "error"]);
        if (!this.error) {
          this.dialogRef.close();
        }
      });
  }
}
