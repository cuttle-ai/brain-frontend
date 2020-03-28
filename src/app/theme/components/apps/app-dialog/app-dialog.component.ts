import { Component, OnInit } from '@angular/core';
import _get from 'lodash/get';

import { App } from 'src/app/core/models';
import { HttpService } from 'src/app/core/services';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'brain-app-dialog',
    templateUrl: './app-dialog.component.html',
    styleUrls: ['./app-dialog.component.scss']
})
export class AppDialogComponent implements OnInit {

    /**
     * app instance to be edited/created
     */
    app: App;

    /**
     * disableOkBtn to disable the update/create button while network request
     */
    disableOkBtn: boolean = false;

    /**
     * isEditing is indicates the dialog is being used for editing.
     * If false, the dialog is being used for creating an app.
     */
    isEditing: boolean = false;

    /**
     * confirmDelete indicates the current state of the dialog is to confirm deleting the app
     */
    confirmDelete: boolean = false;

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
    constructor(protected dialogRef: NbDialogRef<AppDialogComponent>, private http: HttpService, ) {
        this._get = _get;
        this.app = _get(dialogRef, ['componentRef', 'instance', 'app'], {});
        this.isEditing = _get(dialogRef, ['componentRef', 'instance', 'isEditing'], false);
    }

    ngOnInit() {
    }

    /**
     * okButtonClicked is called when user clicks on the update/create button
     */
    okButtonClicked() {
        this.loading = true;
        this.http.post({
            hash: this.isEditing ? 'APP_UPDATE' : this.confirmDelete ? 'APP_DELETE' : 'APP_CREATE', body: this.app,
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
