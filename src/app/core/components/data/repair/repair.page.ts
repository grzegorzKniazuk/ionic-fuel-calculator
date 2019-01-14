import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RepairData } from '../../../interfaces/repair-data';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { ConfirmResponseType } from '../../../enums/confirm-response-type.enum';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-repair',
  templateUrl: './repair.page.html',
  styleUrls: ['./repair.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairPage implements OnInit, OnDestroy {

  public repairHistoryData: RepairData[] = [];

  constructor(private matBottomSheet: MatBottomSheet,
              private matDialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public ngOnDestroy(): void {
  }

  public openNewEntryModal(): void {

  }

  public openConfirmModal(index: number): void {
    this.matBottomSheet.open(ConfirmModalComponent).afterDismissed().subscribe((response: ConfirmResponseType) => {
      if (response === ConfirmResponseType.confirm) {
        // delete entry
        this.changeDetectorRef.detectChanges();
      }
    })
  }
}
