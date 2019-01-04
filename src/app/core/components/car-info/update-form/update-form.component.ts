import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormGroup } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogComponentResponse } from '../../../enums/dialog-component-response.enum';
import { CarData } from '../../../interfaces/car-data';

@Component({
	selector: 'app-update-form',
	templateUrl: './update-form.component.html',
	styleUrls: [ './update-form.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent implements OnInit {

	public carInfoForm: FormGroup;

	constructor(@Inject(MAT_DIALOG_DATA) private carInfoData: CarData,
	            private formService: FormService,
	            private matDialogRef: MatDialogRef<UpdateFormComponent>,
	            private storageService: StorageService) {
	}

	ngOnInit() {
		this.buildForm();
		this.initForm();
	}

	public saveCarData(): void {
		if (this.carInfoForm.valid) {
			this.storageService.updateCarData(this.carInfoForm.value);
			this.matDialogRef.close(DialogComponentResponse.saved);
		}
	}

	private buildForm(): void {
		this.carInfoForm = this.formService.carInfoForm;
	}

	private initForm(): void {
		if (this.carInfoData) {
			this.carInfoForm.setValue(this.carInfoData);
		}
	}
}
