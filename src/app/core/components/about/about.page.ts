import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	templateUrl: './about.page.html',
	styleUrls: [ './about.page.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
}
