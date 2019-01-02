import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RefuelingHistoryData } from '../../../core/interfaces/refueling-history-data';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-refueling-history-data-entry',
  templateUrl: './refueling-history-data-entry.component.html',
  styleUrls: ['./refueling-history-data-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefuelingHistoryDataEntryComponent {

  @Output() public openConfirmModal$: EventEmitter<boolean> = new EventEmitter();
  @Output() public openModifyModal$: EventEmitter<boolean> = new EventEmitter();
  @Input() data: RefuelingHistoryData;

  constructor(public storageService: StorageService) {}

  public openDeleteConfirmModal(): void {
    this.openConfirmModal$.emit(true);
  }

  public openModifyEntryModal(): void {
    this.openModifyModal$.emit(true);
  }
}
