import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-repair-entry',
  templateUrl: './edit-repair-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRepairEntryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
