import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-feedback',
  templateUrl: './validation-feedback.component.html',
  styleUrls: ['./validation-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationFeedbackComponent implements OnInit {

  @Input() public control: AbstractControl;

  public validatorPlaceholder = {
    required: 'To pole jest wymagane',
    minimumValue: 'Minimalna wartość to 1',
    numbersOnly: 'Dozwolone są wyłącznie liczby',
  };

  public ngOnInit(): void {
    console.log(this.control);
  }
}
