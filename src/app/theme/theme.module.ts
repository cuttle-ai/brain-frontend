import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HeaderComponent } from './components';

/**
 * COMPONENTS has the list of components in the theme of the application
 */
const COMPONENTS = [
  HeaderComponent
]

/**
 * ThemeModule has the all the components, directives etc related to the common theme of the application
 * It has components like
 *  * Header
 *  * Footer
 *  * Page Navigator etc
 */
@NgModule({
  imports: [
    CommonModule
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
    return <ModuleWithProviders> {
      ngModule: ThemeModule,
      providers: []
    }
  }
}
