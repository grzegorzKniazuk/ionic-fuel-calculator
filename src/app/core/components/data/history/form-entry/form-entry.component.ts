import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StorageService } from '../../../../services/storage.service';
import { DialogComponentResponse } from '../../../../enums/dialog-component-response.enum';
import { RefuelingHistoryData } from '../../../../interfaces/refueling-history-data';

@AutoUnsubscribe()
@Component({
	selector: 'app-form-entry',
	templateUrl: './form-entry.component.html',
	styleUrls: [ './form-entry.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEntryComponent implements OnInit, OnDestroy {

	public today: Date;
	public refuelingForm: FormGroup;
	@Input() public entryData?: RefuelingHistoryData;

	constructor(private matDialogRef: MatDialogRef<FormEntryComponent>,
	            public storageService: StorageService,
	            private formService: FormService) {
	}

	private get amountOfFuelValue(): Observable<string> {
		return this.refuelingForm.get('amountOfFuel').valueChanges.pipe(map((value: string) => {
			return value;
		}));
	}

	private get fuelCostPerUnitValue(): Observable<string> {
		return this.refuelingForm.get('fuelCostPerUnit').valueChanges.pipe(map((value: string) => {
			return value;
		}));
	}

	ngOnInit() {
		this.initDate();
		this.buildForm();
		this.initFormData();
		this.watchTotalCost();
	}

	ngOnDestroy(): void {
	}

	public saveEntry(): void {
		if (this.refuelingForm.valid && !this.entryData) {
			this.storageService.saveNewRefuelingDataEntry(this.refuelingForm.value);
		} else if (this.refuelingForm.valid && this.entryData && this.entryData.mileage) {
			this.storageService.modifyDataEntry(this.entryData.mileage, this.refuelingForm.value);
		}
		this.matDialogRef.close(DialogComponentResponse.saved);
	}

	private initDate(): void {
		const year = new Date().getFullYear();
		const month = new Date().getMonth();
		const day = new Date().getDate();
		this.today = new Date(year, month, day);
	}

	private buildForm(): void {
		this.refuelingForm = this.formService.refuelingForm;
	}

	private initFormData(): void {
		if (this.entryData) {
			this.refuelingForm.setValue({
				date: this.entryData.date,
				mileage: this.entryData.mileage,
				amountOfFuel: this.entryData.amountOfFuel,
				fuelCostPerUnit: this.entryData.fuelCostPerUnit,
				fuelCost: this.entryData.fuelCost,
			});
		}
	}

	private watchTotalCost(): void {
		combineLatest(this.amountOfFuelValue, this.fuelCostPerUnitValue)
		.pipe(filter((values: [ string, string ]) => {
			return !isNaN(parseFloat(values[0])) && !isNaN(parseFloat(values[1]));
		}))
		.subscribe((values: [ string, string ]) => {
			this.refuelingForm.get('fuelCost').setValue((parseFloat(values[0]) * parseFloat(values[1])).toFixed(2));
		});
	}
}
