import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyCarsPage } from './my-cars.page';
import {MaterialModule} from "../../../material.module";

const routes: Routes = [
  {
    path: '',
    component: MyCarsPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyCarsPage]
})
export class MyCarsPageModule {}
