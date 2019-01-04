import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormHeaderFontSize } from '../../../core/enums/form-header-font-size.enum';

@Component({
	selector: 'app-form-header',
	templateUrl: './form-header.component.html',
	styleUrls: [ './form-header.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeaderComponent {
	@Input() fontSize?: FormHeaderFontSize;
}
