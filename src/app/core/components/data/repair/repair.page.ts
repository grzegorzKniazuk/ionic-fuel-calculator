import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewRef } from '@angular/core';
import { RepairData } from '../../../interfaces/repair-data';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { ConfirmResponseType } from '../../../enums/confirm-response-type.enum';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NewRepairEntryComponent } from './new-repair-entry/new-repair-entry.component';
import { EditRepairEntryComponent } from './edit-repair-entry/edit-repair-entry.component';
import { StorageService } from '../../../services/storage.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-repair',
  templateUrl: './repair.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairPage implements OnInit, OnDestroy {

  public repairHistoryData: RepairData[] = [];

  constructor(private matBottomSheet: MatBottomSheet,
              private matDialog: MatDialog,
              private storageService: StorageService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.storageService.loadRepairHistoryData();
    this.watchRepairHistoryDataChanges();
  }

  public ngOnDestroy(): void {
  }

  public openNewEntryModal(): void {
    this.matDialog.open(NewRepairEntryComponent).afterClosed().subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  public openModifyEntryModal(data: RepairData): void {
    this.matDialog.open(EditRepairEntryComponent, {
      data: data,
    }).afterClosed().subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  public openConfirmModal(data: RepairData): void {
    this.matBottomSheet.open(ConfirmModalComponent).afterDismissed().subscribe((response: ConfirmResponseType) => {
      if (response === ConfirmResponseType.confirm) {
        this.storageService.deleteRepairHistoryDataEntry(data);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  public openSortModal(): void {

  }

  private watchRepairHistoryDataChanges(): void {
    this.storageService.repairHistoryData$.subscribe((data: RepairData[]) => {
      if (data) {
        this.repairHistoryData = data;
        if (!(this.changeDetectorRef as ViewRef).destroyed) {
          this.changeDetectorRef.detectChanges();
        }
      }
    });
  }
}
