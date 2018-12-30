import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {FormService} from '../../../services/form.service';
import {SettingsData} from '../../../interfaces/settings-data';
import {combineLatest, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {StorageService} from '../../../services/storage.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: [ './form-entry.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEntryComponent implements OnInit, OnDestroy {

  @Input() public applicationSettings: SettingsData;
  public today: Date;
  public refuelingForm: FormGroup;
  constructor(private matDialogRef: MatDialogRef<FormEntryComponent>,
              public storageService: StorageService,
              private formService: FormService) {
  }

  ngOnInit() {
    this.initDate();
    this.buildForm();
    this.watchTotalCost();
  }

  ngOnDestroy(): void {
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

  private watchTotalCost(): void {
    combineLatest(this.amountOfFuelValue, this.fuelCostPerUnitValue)
        .pipe(filter((values: [ string, string ]) => {
          return !isNaN(parseFloat(values[0])) && !isNaN(parseFloat(values[1]));
        }))
        .subscribe((values: [ string, string ]) => {
          this.refuelingForm.get('fuelCost').setValue((parseFloat(values[0]) * parseFloat(values[1])).toFixed(2));
    });
  }

  public saveNewEntry(): void {
    if (this.refuelingForm.valid) {
      this.storageService.saveNewRefuelingDataEntry(this.refuelingForm.value);
      this.matDialogRef.close();
    }
  }
}
