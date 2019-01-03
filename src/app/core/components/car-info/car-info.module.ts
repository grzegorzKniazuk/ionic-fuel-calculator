import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarInfoPage } from './car-info.page';
import { MaterialModule } from '../../../material.module';
import { UpdateFormComponent } from './update-form/update-form.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CarInfoPage,
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
      RouterModule.forChild(routes),
  ],
  declarations: [
      CarInfoPage,
      UpdateFormComponent,
  ],
  entryComponents: [
      UpdateFormComponent,
  ],
})
export class CarInfoPageModule {}
