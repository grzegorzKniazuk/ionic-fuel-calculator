import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormHeaderComponent} from './components/form-header/form-header.component';
import { CommaToDotDirective } from './directives/comma-to-dot.directive';

@NgModule({
  declarations: [
      FormHeaderComponent,
      CommaToDotDirective,
  ],
  imports: [
      CommonModule,
  ],
  exports: [
      FormHeaderComponent,
      CommaToDotDirective,
  ],
})
export class SharedModule { }
