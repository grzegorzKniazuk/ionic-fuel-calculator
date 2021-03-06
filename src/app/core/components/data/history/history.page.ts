import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewRef } from '@angular/core';
import { RefuelingHistoryData } from '../../../interfaces/refueling-history-data';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StorageService } from '../../../services/storage.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { ConfirmResponseType } from '../../../enums/confirm-response-type.enum';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { SortModalComponent } from '../../../../shared/components/sort-modal/sort-modal.component';
import { RefuelingSortCriteria } from '../../../interfaces/refueling-sort-criteria';

@AutoUnsubscribe()
@Component({
	selector: 'app-history',
	templateUrl: './history.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPage implements OnInit, OnDestroy {

	public refuelingHistoryData: RefuelingHistoryData[] = [];
	public sortCriteria: RefuelingSortCriteria;

	constructor(private matDialog: MatDialog,
	            private changeDetectorRef: ChangeDetectorRef,
	            private storageService: StorageService,
	            private matBottomSheet: MatBottomSheet) {
	}

	ngOnInit() {
		this.storageService.loadRefuelingHistoryData();
		this.watchHistoryDataChanges();
	}

	public ngOnDestroy(): void {
	}

	public openNewEntryModal(): void {
		this.matDialog.open(NewEntryComponent).afterClosed().subscribe(() => {
			this.changeDetectorRef.detectChanges();
		});
	}

	public openModifyEntryModal(data: RefuelingHistoryData): void {
		this.matDialog.open(EditEntryComponent, {
			data: data,
		}).afterClosed().subscribe(() => {
			this.changeDetectorRef.detectChanges();
		});
	}

	public openConfirmModal(mileage: number): void {
		this.matBottomSheet.open(ConfirmModalComponent).afterDismissed().subscribe((response: ConfirmResponseType) => {
			if (response === ConfirmResponseType.confirm) {
				this.storageService.deleteRefuelingDataEntry(mileage);
				this.changeDetectorRef.detectChanges();
			}
		});
	}

	public openSortModal(): void {
		this.matDialog.open(SortModalComponent).afterClosed().subscribe((criteria: RefuelingSortCriteria) => {
			this.sortCriteria = criteria;
			this.changeDetectorRef.detectChanges();
		});
	}

	private watchHistoryDataChanges(): void {
		this.storageService.refuelingHistoryData$.subscribe((data: RefuelingHistoryData[]) => {
			if (data) {
				this.refuelingHistoryData = data;
				if (!(this.changeDetectorRef as ViewRef).destroyed) {
					this.changeDetectorRef.detectChanges();
				}
			}
		});
	}
}
