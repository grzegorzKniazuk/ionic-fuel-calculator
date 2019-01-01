import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RefuelingHistoryData } from '../../interfaces/refueling-history-data';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { ToastService } from '../../services/toast.service';
import { ToastMessages } from '../../enums/toast-messages.enum';
import { DialogComponentResponse } from '../../enums/dialog-component-response.enum';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StorageService } from '../../services/storage.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { ConfirmResponseType } from '../../enums/confirm-response-type.enum';
import { EditEntryComponent } from './edit-entry/edit-entry.component';

@AutoUnsubscribe()
@Component({
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPage implements OnInit, OnDestroy {

  public refuelingHistoryData: RefuelingHistoryData[] = [];
  constructor(private matDialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              private storageService: StorageService,
              private matBottomSheet: MatBottomSheet,
              private toastService: ToastService) {}

  ngOnInit() {
  	this.storageService.loadRefuelingHistoryData();
    this.watchHistoryDataChanges();
  }

  public ngOnDestroy(): void {
  }

  private watchHistoryDataChanges(): void {
    this.storageService.refuelingHistoryData$.subscribe((data: RefuelingHistoryData[]) => {
      this.refuelingHistoryData = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  public openNewEntryModal(): void {
    this.matDialog.open(NewEntryComponent).afterClosed().subscribe((response: string) => {
      if (response === DialogComponentResponse.saved) {
	      this.changeDetectorRef.detectChanges();
      }
    });
  }

  public openModifyEntryModal(data: RefuelingHistoryData): void {
	  this.matDialog.open(EditEntryComponent, {
	  	data: data,
	  }).afterClosed().subscribe((response: string) => {
		  if (response === DialogComponentResponse.saved) {
			  this.changeDetectorRef.detectChanges();
		  }
	  });
  }

  public openConfirmModal(mileage: string): void {
  	this.matBottomSheet.open(ConfirmModalComponent).afterDismissed().subscribe((response: ConfirmResponseType) => {
  		if (response === 'confirm') {
				this.storageService.deleteDataEntry(mileage);
				this.changeDetectorRef.detectChanges();
		  }
	  });
  }
}
