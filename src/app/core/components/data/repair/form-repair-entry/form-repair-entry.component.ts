import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RepairData } from '../../../../interfaces/repair-data';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { StorageService } from '../../../../services/storage.service';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-form-repair-entry',
  templateUrl: './form-repair-entry.component.html',
  styleUrls: ['./form-repair-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRepairEntryComponent implements OnInit {

  @Input() public entryData?: RepairData;
  public today: Date;
  public repairForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<FormRepairEntryComponent>,
              public storageService: StorageService,
              private formService: FormService) { }

  ngOnInit() {
    this.initDate();
    this.buildForm();
    this.initFormData();
  }

  public saveEntry(): void {
    if (this.repairForm.valid && !this.entryData) {
      this.storageService.saveNewRepairHistoryDataEntry(this.repairForm.value);
    } else if (this.repairForm.valid && this.entryData) {

    }
  }

  private initDate(): void {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    this.today = new Date(year, month, day);
  }

  private buildForm(): void {
    this.repairForm = this.formService.repairForm;
  }

  private initFormData(): void {
    if (this.entryData) {
      this.repairForm.setValue({
        date: this.entryData.date,
        description: this.entryData.description,
        price: this.entryData.price,
      });
    }
  }
}
