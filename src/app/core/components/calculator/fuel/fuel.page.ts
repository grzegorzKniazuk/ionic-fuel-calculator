import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {FormGroup} from "@angular/forms";
import {FuelSimulationData} from "../../../interfaces/fuel-simulation-data";
import {filter, tap} from "rxjs/operators";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {StorageService} from "../../../services/storage.service";
import {SettingsData} from "../../../interfaces/settings-data";
import {MetricUnits} from "../../../enums/metric-units.enum";

@AutoUnsubscribe()
@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  styleUrls: ['./fuel.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelPage implements OnInit, OnDestroy {

  public applicationSettings: SettingsData;
  public fuelConsumption: number;
  public travelCost: number;
  public fuelSimulationForm: FormGroup;

  constructor(private formService: FormService,
              public storageService: StorageService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.watchForm();
    this.watchSettings();
  }

  ngOnDestroy(): void {
  }

  private buildForm(): void {
    this.fuelSimulationForm = this.formService.fuelSimulationForm;
  }

  private watchSettings(): void {
    this.storageService.applicationSettings$
        .pipe(filter((data: SettingsData) => data !== null ))
        .subscribe((data: SettingsData) => {
          this.applicationSettings = data;
          this.calculateFuelConsumption(this.fuelSimulationForm.value);
    });
  }

  private watchForm(): void {
    this.fuelSimulationForm.valueChanges
        .pipe(tap(() => {
          if (this.fuelSimulationForm.get('costPerUnit').value === '') {
            this.travelCost = 0;
          }
        }))
        .pipe(filter((formData: FuelSimulationData) => {
          return this.fuelSimulationForm.get('refiledLiters').valid
              && this.fuelSimulationForm.get('traveledDistance').valid
              && formData.refiledLiters !== ''
              && formData.traveledDistance !== '';
        }))
        .subscribe((formData: FuelSimulationData) => {
          this.calculateFuelConsumption(formData);
        });
  }

  private calculateFuelConsumption(formData: FuelSimulationData): void {
    if (formData.refiledLiters !== '' && formData.traveledDistance !== '') {
      if (this.applicationSettings.metricUnits === MetricUnits.PL) {
        this.fuelConsumption =  parseFloat(formData.refiledLiters) / parseFloat(formData.traveledDistance) * 100;
        if (this.fuelSimulationForm.get('costPerUnit').valid && formData.costPerUnit !== '') {
          this.travelCost = ((parseFloat(this.fuelSimulationForm.get('costPerUnit').value) * this.fuelConsumption) * 100 + Number.EPSILON) / 100;
        }
      } else if (this.applicationSettings.metricUnits === MetricUnits.US) {
        this.fuelConsumption = parseFloat(formData.traveledDistance) / parseFloat(formData.refiledLiters);
      }
    }
  }
}
