import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RefuelingHistoryData } from '../../../../interfaces/refueling-history-data';

@Component({
	selector: 'app-edit-entry',
	templateUrl: './edit-entry.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEntryComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: RefuelingHistoryData) {
	}
}
