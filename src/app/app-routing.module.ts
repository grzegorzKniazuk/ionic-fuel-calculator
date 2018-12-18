import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  { path: 'calculator', loadChildren: './core/components/calculator/calculator.module#CalculatorPageModule' },
  { path: 'my-cars', loadChildren: './core/components/my-cars/my-cars.module#MyCarsPageModule' },
  { path: 'settings', loadChildren: './core/components/settings/settings.module#SettingsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
