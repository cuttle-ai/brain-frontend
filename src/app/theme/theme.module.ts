import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbDialogModule,
  NbAlertModule,
  NbSpinnerModule,
  NbListModule,
  NbTreeGridModule,
  NbIconModule,
} from '@nebular/theme';

import { HeaderComponent, PageComponent, FileuploadComponent, AppsComponent, AppDialogComponent, SearchComponent } from './components';

/**
 * COMPONENTS has the list of components in the theme of the application
 */
const COMPONENTS = [
  HeaderComponent,
  PageComponent,
  FileuploadComponent,
  AppsComponent,
  AppDialogComponent,
  SearchComponent,
]

/**
 * ThemeModule has the all the components, directives etc related to the common theme of the application
 * It has components like
 *  * Header
 *  * Page Navigator
 *  * Fileupload
 */
@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbDialogModule.forChild(),
    NbAlertModule,
    NbSpinnerModule,
    NbListModule,
    NbTreeGridModule,
    FormsModule,
    NbIconModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS
  ],
  entryComponents: [AppDialogComponent],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: []
    }
  }
}
