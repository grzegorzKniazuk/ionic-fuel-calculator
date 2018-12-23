import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryPage } from './history.page';
import {MaterialModule} from "../../../material.module";
import { NewEntryComponent } from './new-entry/new-entry.component';
import { FormEntryComponent } from './form-entry/form-entry.component';
import {EditEntryComponent} from "./edit-entry/edit-entry.component";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {
      path: '',
      component: HistoryPage,
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
        RouterModule.forChild(routes)
    ],
    declarations: [
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
export class HistoryPageModule {}
