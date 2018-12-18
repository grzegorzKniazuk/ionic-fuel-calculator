import { NgModule } from '@angular/core';
import {MatButtonModule, MatIconModule, MatInputModule} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class MaterialModule { }
