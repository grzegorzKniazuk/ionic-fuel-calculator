import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatNumberOnlyValidator } from '../../shared/validators/float-numbers-only.validator';
import { MoneyUnits } from '../enums/money-units.enum';
import { IntegerNumberOnlyValidator } from '../../shared/validators/int-numbers-only.validator';
import { MetricUnits } from '../enums/metric-units.enum';
import { SortType } from '../enums/sort-type.enum';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }

  public get settingsForm(): FormGroup {
    return this.formBuilder.group({
      metricUnits: [ MetricUnits.PL, [ Validators.required ] ],
      moneyUnits: [ MoneyUnits.pln, [ Validators.required ] ],
    });
  }

  public get fuelSimulationForm(): FormGroup {
    return this.formBuilder.group({
      refiledLiters: ['', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ]],
      traveledDistance: ['', [ Validators.required, FloatNumberOnlyValidator, Validators.min(1) ]],
      costPerUnit: [ '', [ FloatNumberOnlyValidator, Validators.min(1) ]],
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
      date: [ '', [ Validators.required ]],
      mileage: ['', [ Validators.required, Validators.min(1), IntegerNumberOnlyValidator ]],
      amountOfFuel: ['', [ Validators.required, Validators.min(1), FloatNumberOnlyValidator ]],
      fuelCostPerUnit: ['', [ Validators.required, Validators.min(1), FloatNumberOnlyValidator ]],
      fuelCost: ['', [ Validators.required, Validators.min(1), FloatNumberOnlyValidator ]],
    });
  }

  public get sortForm(): FormGroup {
    return this.formBuilder.group({
      date: [ SortType.DESC , [ Validators.required, Validators.pattern(/asc|desc/) ] ],
      mileage: ['', [ Validators.pattern(/asc|desc/) ]],
      distance: ['', [ Validators.pattern(/asc|desc/) ]],
      amountOfFuel: ['', [ Validators.pattern(/asc|desc/) ]],
      fuelCostPerUnit: ['', [ Validators.pattern(/asc|desc/) ]],
      fuelCost: ['', [ Validators.pattern(/asc|desc/) ]],
    });
  }
}
