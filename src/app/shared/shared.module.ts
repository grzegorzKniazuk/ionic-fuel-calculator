import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormHeaderComponent} from './components/form-header/form-header.component';
import { CommaToDotDirective } from './directives/comma-to-dot.directive';
import { HistoryDataEntryComponent } from './components/history-data-entry/history-data-entry.component';
import { MaterialModule } from '../material.module';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
      FormHeaderComponent,
      CommaToDotDirective,
      HistoryDataEntryComponent,
      ConfirmModalComponent,
  ],
  imports: [
      CommonModule,
      MaterialModule,
  ],
  entryComponents: [
      ConfirmModalComponent,
  ],
  exports: [
      FormHeaderComponent,
      CommaToDotDirective,
      HistoryDataEntryComponent,
  ],
})
export class SharedModule { }
