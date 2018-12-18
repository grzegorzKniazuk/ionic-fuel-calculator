import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
