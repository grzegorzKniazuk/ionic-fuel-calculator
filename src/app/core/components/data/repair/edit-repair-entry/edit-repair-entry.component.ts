import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RepairData } from '../../../../interfaces/repair-data';

@Component({
  selector: 'app-edit-repair-entry',
  templateUrl: './edit-repair-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRepairEntryComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RepairData) {}
}
