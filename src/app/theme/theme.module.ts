import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HeaderComponent, PageComponent, FileuploadComponent } from './components';

/**
 * COMPONENTS has the list of components in the theme of the application
 */
const COMPONENTS = [
  HeaderComponent,
  PageComponent,
  FileuploadComponent,
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
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: []
    }
  }
}
