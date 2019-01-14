import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataPage } from './data.page';
import { MaterialModule } from '../../../material.module';
import { HistoryPage } from './history/history.page';
import { NewEntryComponent } from './history/new-entry/new-entry.component';
import { EditEntryComponent } from './history/edit-entry/edit-entry.component';
import { FormEntryComponent } from './history/form-entry/form-entry.component';
import { SharedModule } from '../../../shared/shared.module';
import { RepairPage } from './repair/repair.page';
import { NewRepairEntryComponent } from './repair/new-repair-entry/new-repair-entry.component';
import { EditRepairEntryComponent } from './repair/edit-repair-entry/edit-repair-entry.component';
import { FormRepairEntryComponent } from './repair/form-repair-entry/form-repair-entry.component';

const routes: Routes = [
	{
		path: '',
		component: DataPage,
	},
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		MaterialModule,
		SharedModule,
		RouterModule.forChild(routes),
	],
	declarations: [
		DataPage,
		HistoryPage,
		RepairPage,
		NewEntryComponent,
		EditEntryComponent,
		FormEntryComponent,
		NewRepairEntryComponent,
		EditRepairEntryComponent,
		FormRepairEntryComponent,
	],
	entryComponents: [
		NewEntryComponent,
		EditEntryComponent,
	],
})
export class DataPageModule {
}
