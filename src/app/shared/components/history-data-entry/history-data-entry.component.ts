import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RefuelingHistoryData } from '../../../core/interfaces/refueling-history-data';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-history-data-entry',
  templateUrl: './history-data-entry.component.html',
  styleUrls: ['./history-data-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryDataEntryComponent {

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
