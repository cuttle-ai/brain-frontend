import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Subscription } from "rxjs";

import { Theme, LightTheme } from "src/app/theme/theme";
import { HttpService, WebSocketsService } from "src/app/core/services";
import { FileUpload } from "src/app/core/models";

import { DatasetDialogComponent } from "./dataset/dataset-dialog/dataset-dialog.component";
import { ActionNotification } from "../../../core/models";

@Component({
  selector: "brain-datasets",
  templateUrl: "./datasets.component.html",
  styleUrls: ["./datasets.component.scss"],
})
export class DatasetsComponent implements OnInit, OnDestroy {
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
  search: string = "";

  /**
   * style of the page
   */
  style: object = {
    BACKGROUND: {
      "background-color": this.theme.PrimaryBackgroundColor,
    },
  };

  /**
   * reuploadSource has the object containing the upload file type requirements like acceptedTypes, ID of etc
   */
  reuploadSource: any;

  /**
   * notificationIns is the notification instance of the application.
   * This is subscribed to the notification from websockets service
   */
  notificationIns: Subscription;

  /**
   * We will do the necessary initialisations required by this component
   */
  constructor(
    private router: Router,
    private http: HttpService,
    private dialogService: NbDialogService,
    private ws: WebSocketsService
  ) {}

  /**
   * loadDatasets loads the datasets for the user
   */
  loadDatasets() {
    this.http.get({ hash: "DATASETS" }).subscribe((resp) => {
      this.fileUploads = resp.Data;
    });
  }

  ngOnInit() {
    this.loadDatasets();

    this.notificationIns = this.ws
      .actionNotifications()
      .subscribe((n: ActionNotification) => {
        if (n.action === "DATASETS") {
          this.loadDatasets();
        }
      });
  }

  /**
   * We will unsubscribe to the session service
   */
  ngOnDestroy() {
    this.notificationIns.unsubscribe();
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
    this.dialogService
      .open(DatasetDialogComponent, {
        context: {
          dataset: JSON.parse(
            JSON.stringify(this.fileUploads.find((item) => item.ID === id))
          ),
          forDelete: true,
        },
      })
      .onClose.subscribe();
  }
}
