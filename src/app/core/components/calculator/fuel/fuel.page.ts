import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {FormGroup} from "@angular/forms";
import {FuelSimulationData} from "../../../interfaces/fuel-simulation-data";
import {filter, tap} from "rxjs/operators";
import {ToastService} from "../../../services/toast.service";
import {DistanceUnits} from "../../../enums/distance-units.enum";
import {FuelUnits} from "../../../enums/fuel-units.enum";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {CalculatorPage} from "../../../models/calculator-page.model";
import {Storage} from "@ionic/storage";

@AutoUnsubscribe()
@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  styleUrls: ['./fuel.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelPage extends CalculatorPage implements OnInit, OnDestroy {

  public fuelConsumption: number;
  public travelCost: number;
  public fuelSimulationForm: FormGroup;

  constructor(private formService: FormService,
              private changeDetectorRef: ChangeDetectorRef,
              protected storage: Storage,
              protected toastService: ToastService) {
      super(storage, toastService);
  }

  ngOnInit(): void {
    super.loadApplicationSettings();
    this.buildForm();
    this.watchForm();
  }

  ngOnDestroy(): void {
  }

  private buildForm(): void {
    this.fuelSimulationForm = this.formService.fuelSimulationForm;
  }

  private watchForm(): void {
    this.fuelSimulationForm.valueChanges
        .pipe(tap(() => {
          if (this.fuelSimulationForm.get('costPerUnit').value === '') {
            this.travelCost = 0;
          }
        }))
        .pipe(filter(() => {
          return this.fuelSimulationForm.get('refiledLiters').valid && this.fuelSimulationForm.get('traveledDistance').valid;
        }))
        .subscribe((formData: FuelSimulationData) => {
      if (formData.refiledLiters !== '' && formData.traveledDistance !== '') {
        if (this.applicationSettings.distanceUnits === DistanceUnits.km && this.applicationSettings.fuelUnits === FuelUnits.liters) {
          this.fuelConsumption = parseFloat(formData.refiledLiters) / parseFloat(formData.traveledDistance) * 100;
          if (this.fuelSimulationForm.get('costPerUnit').valid && formData.costPerUnit !== '') {
            this.travelCost = ((parseFloat(this.fuelSimulationForm.get('costPerUnit').value) * this.fuelConsumption) * 100 + Number.EPSILON) / 100;
          }
        } else if (this.applicationSettings.distanceUnits === DistanceUnits.mile && this.applicationSettings.fuelUnits === FuelUnits.gallons) {
          this.fuelConsumption = parseFloat(formData.traveledDistance) / parseFloat(formData.refiledLiters);
        } else {

        }
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
