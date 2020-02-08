import { Component, OnInit } from '@angular/core';
import _get from 'lodash/get';

import { Dataset } from 'src/app/core/models';
import { HttpService } from 'src/app/core/services';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'brain-dataset-dialog',
    templateUrl: './dataset-dialog.component.html',
    styleUrls: ['./dataset-dialog.component.scss']
})
export class DatasetDialogComponent implements OnInit {

    /**
     * fileUploads has the list of file uploads in the system
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
    loading: boolean

    /**
     * We will do the necessary initialisations required by this component
     */
    constructor(protected dialogRef: NbDialogRef<DatasetDialogComponent>, private http: HttpService, ) {
        this._get = _get;
        this.dataset = _get(dialogRef, ['componentRef', 'instance', 'dataset'], {});
    }

    ngOnInit() {
    }

    /**
     * update is called when user clicks on the update button
     */
    update() {
        this.loading = true;
        this.http.post({
            hash: 'DATASET_UPDATE', body: this.dataset,
        }).subscribe((resp) => {
            this.loading = false;
            this.error = _get(resp, ['error', 'error']);
            if (!this.error) {
                this.dialogRef.close();
            }
        })
    }

    /**
     * cancel is invoked when user clicks on the cancel button
     */
    cancel() {
        this.dialogRef.close();
    }
}
