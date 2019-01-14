import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-new-entry',
	templateUrl: './new-entry.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEntryComponent {
}
