import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormHeaderComponent} from './components/form-header/form-header.component';
import { CommaToDotDirective } from './directives/comma-to-dot.directive';
import { RefuelingHistoryDataEntryComponent } from './components/refueling-history-data-entry/refueling-history-data-entry.component';
import { MaterialModule } from '../material.module';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SortModalComponent } from './components/sort-modal/sort-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistorySortPipe } from './pipes/history-sort.pipe';
import { NoDataComponent } from './components/no-data/no-data.component';

@NgModule({
  declarations: [
    FormHeaderComponent,
    CommaToDotDirective,
    RefuelingHistoryDataEntryComponent,
    ConfirmModalComponent,
    SortModalComponent,
    HistorySortPipe,
    NoDataComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ConfirmModalComponent,
    SortModalComponent,
  ],
  exports: [
    FormHeaderComponent,
    CommaToDotDirective,
    RefuelingHistoryDataEntryComponent,
    HistorySortPipe,
    NoDataComponent
  ],
})
export class SharedModule { }
