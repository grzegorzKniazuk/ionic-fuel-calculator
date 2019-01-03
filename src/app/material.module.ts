import { NgModule } from '@angular/core';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MAT_SNACK_BAR_DEFAULT_OPTIONS, MatBottomSheetModule,
    MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogConfig, MatDialogModule,
    MatIconModule,
    MatInputModule, MatNativeDateModule,
    MatRadioModule,
    MatSnackBarConfig,
    MatSnackBarModule, MatTabsModule,
} from '@angular/material';

const MAT_SNACKBAR_GLOBAL_CONFIG: MatSnackBarConfig = {
    duration: 2500,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
};

const MAT_DIALOG_GLOBAL_CONFIG: MatDialogConfig = {
    width: '90%',
    maxHeight: '95%',
    disableClose: true,
    hasBackdrop: true,
    autoFocus: true,
    role: 'dialog',
};

@NgModule({
    imports: [
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
        MatTabsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatCardModule,
        MatBottomSheetModule,
    ],
    exports: [
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
        MatTabsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatBottomSheetModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_GLOBAL_CONFIG },
    ]
})
export class MaterialModule { }
