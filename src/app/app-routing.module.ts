import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  { path: 'calculator', loadChildren: './core/components/calculator/calculator.module#CalculatorPageModule' },
  { path: 'settings', loadChildren: './core/components/settings/settings.module#SettingsPageModule' },
  { path: 'history', loadChildren: './core/components/history/history.module#HistoryPageModule' },
  { path: 'about', loadChildren: './core/components/about/about.module#AboutPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
