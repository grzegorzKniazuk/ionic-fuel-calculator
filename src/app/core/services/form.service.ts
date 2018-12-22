import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DistanceUnits} from "../enums/distance-units.enum";
import { FuelUnits} from "../enums/fuel-units.enum";
import { NumberOnlyValidator } from "../../shared/validators/numbers-only.validator";
import {MoneyUnits} from "../enums/money-units.enum";

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }

  public get settingsForm(): FormGroup {
    return this.formBuilder.group({
      distanceUnits: [ DistanceUnits.km, [ Validators.required ] ],
      fuelUnits: [ FuelUnits.liters, [ Validators.required ] ],
      moneyUnits: [ MoneyUnits.pln, [ Validators.required ] ],
    });
  }

  public get fuelSimulationForm(): FormGroup {
    return this.formBuilder.group({
      refiledLiters: ['', [ Validators.required, NumberOnlyValidator, Validators.min(1) ]],
      traveledDistance: ['', [ Validators.required, NumberOnlyValidator, Validators.min(1) ]],
      costPerUnit: [ '', [ NumberOnlyValidator, Validators.min(1) ]],
    });
  }

  public get costSimulationForm(): FormGroup {
    return this.formBuilder.group({
      averageFuelConsumption: [ '', [ Validators.required, NumberOnlyValidator, Validators.min(1) ] ],
      distanceToGo: [ '', [ Validators.required, NumberOnlyValidator, Validators.min(1) ] ],
      costPerUnit: [ '', [ Validators.required, NumberOnlyValidator, Validators.min(1) ] ],
    });
  }

  public get rangeSimulationForm(): FormGroup {
    return this.formBuilder.group({
      averageFuelConsumption: [ '', [ Validators.required, NumberOnlyValidator, Validators.min(1) ] ],
      fuelCost: [ '', [ Validators.required, NumberOnlyValidator, Validators.min(1) ] ],
      costPerUnit: [ '', [ Validators.required, NumberOnlyValidator, Validators.min(1) ] ],
    })
  }
}
