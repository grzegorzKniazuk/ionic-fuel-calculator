import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-repair-entry',
  templateUrl: './form-repair-entry.component.html',
  styleUrls: ['./form-repair-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRepairEntryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
