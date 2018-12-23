import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormHeaderComponent} from "./components/form-header/form-header.component";

@NgModule({
  declarations: [
      FormHeaderComponent,
  ],
  imports: [
      CommonModule,
  ],
  exports: [
      FormHeaderComponent,
  ],
})
export class SharedModule { }
