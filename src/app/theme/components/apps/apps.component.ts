import { Component, OnInit, Input } from '@angular/core';
import _get from 'lodash/get';
import { NbDialogService } from '@nebular/theme';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';

import { SessionService, HttpService } from 'src/app/core/services';
import { Theme, DarkTheme } from 'src/app/theme/theme';
import { App, Profile } from 'src/app/core/models';

import { AppDialogComponent } from './app-dialog/app-dialog.component';

/**
 * AppsComponent component has the management for the apps registered by the user in the platform
 * 
 * @example :-
 *      <apps [theme]=darkTheme>
 *      </apps>
 */
@Component({
  selector: 'apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  /**
   * theme is the theme of the header
   */
  @Input()
  theme: Theme = new DarkTheme();

  /**
   * profile is the user profile
   */
  profile: Profile;

  /**
   * apps registered by the user
   */
  apps: App[];

  /**
   * appTableHeaders is the list of  header beloning to the table listing columns
   */
  appTableHeaders: string[] = ['Name', 'Description', 'Access Token', 'Actions'];
  appTableProps = { 'Name': 'Name', 'Description': 'Description', 'Access Token': 'AccessToken', 'Actions': 'Actions' };
  appTableDataSource: NbTreeGridDataSource<App>;
  appTableSortColumn: string;
  appTableSortDirection: NbSortDirection = NbSortDirection.NONE;

  /**
   * menuOptions flag enables and disables the navigation menu
   */
  menuOptions: boolean;

  constructor(
    private session: SessionService,
    private http: HttpService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<App>,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) {
  }

  loadAppsList() {
    this.http.get({ hash: 'APPS_LIST' }).subscribe((resp) => {
      this.apps = _get(resp, 'Data', []);
      this.appTableDataSource = this.dataSourceBuilder.create(this.apps.map(c => ({ data: c })));
    })
  }

  ngOnInit() {
    this.loadAppsList();
    this.session.profile().subscribe((p: Profile) => {
      this.profile = p;
    })
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.appTableSortColumn = sortRequest.column;
    this.appTableSortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.appTableSortColumn === column) {
      return this.appTableSortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  createApp() {
    this.dialogService.open(AppDialogComponent, {
      context: {
        app: JSON.parse(JSON.stringify({
          Name: '',
          Description: '',
          AccessToken: '',
          Email: this.profile.Email,
          UserID: this.profile.ID,
        })),
      },
    }).onClose.subscribe(this.loadAppsList.bind(this));
  }

  editApp(app: App) {
    this.dialogService.open(AppDialogComponent, {
      context: {
        app: app,
        isEditing: true,
      },
    }).onClose.subscribe(this.loadAppsList.bind(this));
  }

  deleteApp(app: App) {
    this.dialogService.open(AppDialogComponent, {
      context: {
        app: app,
        confirmDelete: true,
      },
    }).onClose.subscribe(this.loadAppsList.bind(this));
  }

  /* To copy any Text */
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastrService.show(
      '',
      `copied the access token`,
      { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'info', hasIcon: true, icon: 'copy-outline' });
  }

}
