import { NgModule } from '@angular/core';
import {
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarConfig,
    MatSnackBarModule, MatTabsModule,
} from "@angular/material";

const MAT_SNACKBAR_GLOBAL_CONFIG: MatSnackBarConfig = {
    duration: 2500,
    horizontalPosition: "center",
    verticalPosition: "bottom",
};

@NgModule({
    declarations: [],
    imports: [
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
        MatTabsModule,
    ],
    exports: [
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
        MatTabsModule,
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_GLOBAL_CONFIG },
    ]
})
export class MaterialModule { }
