import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatNumberOnlyValidator } from '../../shared/validators/float-numbers-only.validator';
import { IntegerNumberOnlyValidator } from '../../shared/validators/int-numbers-only.validator';

@Injectable({
	providedIn: 'root',
})
export class FormService {

	constructor(private formBuilder: FormBuilder) {
	}

	public get fuelSimulationForm(): FormGroup {
		return this.formBuilder.group({
			refiledLiters: [ '', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ] ],
			traveledDistance: [ '', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ] ],
			costPerUnit: [ '', [ FloatNumberOnlyValidator, Validators.min(1) ] ],
		});
	}

	public get costSimulationForm(): FormGroup {
		return this.formBuilder.group({
			averageFuelConsumption: [ '', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ] ],
			distanceToGo: [ '', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ] ],
			costPerUnit: [ '', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ] ],
		});
	}

	public get rangeSimulationForm(): FormGroup {
		return this.formBuilder.group({
			averageFuelConsumption: [ '', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ] ],
			fuelCost: [ '', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ] ],
			costPerUnit: [ '', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ] ],
		});
	}

	public get refuelingForm(): FormGroup {
		return this.formBuilder.group({
			date: [ '', [ Validators.required ] ],
			mileage: [ '', [ Validators.required, Validators.min(1), IntegerNumberOnlyValidator ] ],
			amountOfFuel: [ '', [ Validators.required, Validators.min(1), FloatNumberOnlyValidator ] ],
			fuelCostPerUnit: [ '', [ Validators.required, Validators.min(1), FloatNumberOnlyValidator ] ],
			fuelCost: [ '', [ Validators.required, Validators.min(1), FloatNumberOnlyValidator ] ],
		});
	}

	public get sortForm(): FormGroup {
		return this.formBuilder.group({
			date: [ '' ],
			mileage: [ '' ],
			distance: [ '' ],
			amountOfFuel: [ '' ],
			fuelCostPerUnit: [ '' ],
			fuelCost: [ '' ],
		});
	}

	public get carInfoForm(): FormGroup {
		return this.formBuilder.group({
			brand: [ '' ],
			model: [ '' ],
			year: [ '', [ Validators.minLength(4), Validators.maxLength(4), IntegerNumberOnlyValidator ] ],
			vin: [ '' ],
			plate: [ '' ],
			insuranceNumber: [ '' ],
		});
	}
}
