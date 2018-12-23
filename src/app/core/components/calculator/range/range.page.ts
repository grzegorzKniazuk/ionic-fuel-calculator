import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {FormGroup} from "@angular/forms";
import {FormService} from "../../../services/form.service";
import {RangeSimulationData} from "../../../interfaces/range-simulation-data";
import {StorageService} from "../../../services/storage.service";

@AutoUnsubscribe()
@Component({
  selector: 'app-range',
  templateUrl: './range.page.html',
  styleUrls: ['./range.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangePage implements OnInit, OnDestroy {

  public rangeSimulationForm: FormGroup;
  public amountOfFuel: number;
  public range: number;

  constructor(private formService: FormService,
              public storageService: StorageService) {
  }

  ngOnInit() {
    this.buildForm();
    this.watchForm();
  }

  ngOnDestroy(): void {
  }

  private buildForm(): void {
    this.rangeSimulationForm = this.formService.rangeSimulationForm;
  }

  private watchForm(): void {
    this.rangeSimulationForm.valueChanges.subscribe((data: RangeSimulationData) => {
      if (this.rangeSimulationForm.valid) {
        this.amountOfFuel = parseFloat(data.fuelCost) / parseFloat(data.costPerUnit);
        this.range = 1;
      } else {
        this.amountOfFuel = 0;
        this.range = 0;
      }
    });
  }
}
