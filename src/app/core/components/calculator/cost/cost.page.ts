import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from "../../../services/form.service";
import { FormGroup } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { ToastService } from "../../../services/toast.service";
import {CostSimulationData} from "../../../interfaces/cost-simulation-data";
import {CalculatorPage} from "../../../models/calculator-page.model";

@AutoUnsubscribe()
@Component({
  selector: 'app-cost',
  templateUrl: './cost.page.html',
  styleUrls: ['./cost.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostPage extends CalculatorPage implements OnInit, OnDestroy {

  public costSimulationForm: FormGroup;
  public fuelConsumption: number;
  public fuelCost: number;

  constructor(private formService: FormService,
              private changeDetectorRef: ChangeDetectorRef,
              protected storage: Storage,
              protected toastService: ToastService) {
    super(storage, toastService);
  }

  ngOnInit() {
    super.loadApplicationSettings();
    this.buildForm();
    this.watchForm();
  }

  ngOnDestroy(): void {
  }

  private buildForm(): void {
    this.costSimulationForm = this.formService.costSimulationForm;
  }

  private watchForm(): void {
    this.costSimulationForm.valueChanges.subscribe((data: CostSimulationData) => {
      if (this.costSimulationForm.valid) {
        this.fuelConsumption = parseFloat(data.distanceToGo) / 100 * parseFloat(data.averageFuelConsumption);
        this.fuelCost = this.fuelConsumption * parseFloat(data.costPerUnit);
      } else {
        this.fuelConsumption = 0;
        this.fuelCost = 0;
      }
      this.changeDetectorRef.detectChanges();
    });
  }
}
