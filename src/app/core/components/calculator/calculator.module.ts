import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalculatorPage } from './calculator.page';
import {MaterialModule} from "../../../material.module";
import {CostPage} from "./cost/cost.page";
import {FuelPage} from "./fuel/fuel.page";
import {RangePage} from "./range/range.page";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: CalculatorPage,
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
      CalculatorPage,
      CostPage,
      FuelPage,
      RangePage,
  ]
})
export class CalculatorPageModule {}
