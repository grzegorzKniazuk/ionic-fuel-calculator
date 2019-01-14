import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-repair-entry',
  templateUrl: './new-repair-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRepairEntryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
