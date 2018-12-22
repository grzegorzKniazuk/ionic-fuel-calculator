import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPage {}
