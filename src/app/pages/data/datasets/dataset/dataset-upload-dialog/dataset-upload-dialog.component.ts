import { Component, OnInit } from '@angular/core';
import _get from 'lodash/get';

import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'brain-dataset-upload-dialog',
    templateUrl: './dataset-upload-dialog.component.html',
    styleUrls: ['./dataset-upload-dialog.component.scss']
})
export class DatasetUploadDialogComponent implements OnInit {

    /**
     * id of the dataset
     */
    id: number;

    /**
     * sourceType of the dataset
     */
    sourceType: string;

    /**
     * We will do the necessary initialisations required by this component
     */
    constructor(protected dialogRef: NbDialogRef<DatasetUploadDialogComponent>) {
        this.id = _get(dialogRef, ['componentRef', 'instance', 'id'], 0);
        this.sourceType = _get(dialogRef, ['componentRef', 'instance', 'sourceType'], '');
    }

    ngOnInit() {
    }

    /**
     * update is called when user clicks on the update button
     */
    selected(append: boolean) {
        this.dialogRef.close({ id: this.id, append, sourceType: this.sourceType });
    }

    /**
     * cancel is invoked when user clicks on the cancel button
     */
    cancel() {
        this.dialogRef.close();
    }
}
