import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataPage } from './data.page';
import { MaterialModule } from '../../../material.module';
import { HistoryPage } from './history/history.page';
import { NewEntryComponent } from './history/new-entry/new-entry.component';
import { EditEntryComponent } from './history/edit-entry/edit-entry.component';
import { FormEntryComponent } from './history/form-entry/form-entry.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DataPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DataPage,
    HistoryPage,
    NewEntryComponent,
    EditEntryComponent,
    FormEntryComponent,
  ],
  entryComponents: [
    NewEntryComponent,
    EditEntryComponent,
  ],
})
export class DataPageModule {}
