import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  { path: 'calculator', loadChildren: './core/components/calculator/calculator.module#CalculatorPageModule' },
  { path: 'about', loadChildren: './core/components/about/about.module#AboutPageModule' },
  { path: 'data', loadChildren: './core/components/data/data.module#DataPageModule' },  { path: 'car-info', loadChildren: './core/components/car-info/car-info.module#CarInfoPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
