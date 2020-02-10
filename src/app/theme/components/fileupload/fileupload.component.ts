import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as Dropzone from 'dropzone';

import { SessionService } from 'src/app/core/services/session.service';

/**
* FileuploadComponent has creates the ui and handles the uploading of file from UI
* 
* @example
*          <brain-fileupload
*                        [action]="'/server/upload'"
*                        [acceptedFileTypes]="'.csv'"
*                        (fileuploaded)="handlesuccess($event)"
*                        (fileuploaderror)="handleerror($event)">
*          </brain-fileupload>
*/
@Component({
  selector: 'brain-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit, OnChanges {

  /**
  * action is the action url to which the file has to be uploaded
  */
  @Input()
  action: string;

  /**
  * acceptedFileTypes are the accepted file types separated by comma
  */
  @Input()
  acceptedFileTypes: string;

  /**
  * fileuploaded is emitted when the file upload is completed sucessfully.
  * It will emit the response from the server
  */
  @Output()
  fileuploaded: EventEmitter<any> = new EventEmitter<any>();

  /**
  * fileuploaderror is emitted when the file upload has met with some error
  * It will emit the error response from the server
  */
  @Output()
  fileuploaderror: EventEmitter<any> = new EventEmitter<any>();

  constructor(private el: ElementRef, private session: SessionService) { }

  /**
  * ngOnChanges is triggered when the input to the component changes
  * 
  * @param {SimpleChanges} changes changed input mapped to an object
  */
  ngOnChanges(changes: SimpleChanges) {
    /*
     * We will go forward only if the accepted file types input is there
     * Then we will initiate the drop zone
     */
    if (!this.acceptedFileTypes) {
      return;
    }

    let header = {};
    header[SessionService.AuthHeader] = this.session.getAuthToken();
    let drop = new Dropzone(this.el.nativeElement.querySelector('#dropzone'), {
      url: this.action,
      acceptedFiles: this.acceptedFileTypes ? this.acceptedFileTypes : '',
      headers: header,
    });
    drop.on('success', function (evt: any) {
      this.fileuploaded.emit(evt);
    }.bind(this), function (evt: any) {
      this.fileuploaderror.emit(evt);
    }.bind(this))
  }

  /**
  * The necessary initializations are done like initing the dropzone plugin
  */
  ngOnInit() { }

}
