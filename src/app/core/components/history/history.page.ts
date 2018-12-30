import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {RefuelingHistoryData} from '../../interfaces/refueling-history-data';
import {MatDialog} from '@angular/material';
import {NewEntryComponent} from './new-entry/new-entry.component';
import {ToastService} from '../../services/toast.service';
import {ToastMessages} from '../../enums/toast-messages.enum';
import {DialogComponentResponse} from '../../enums/dialog-component-response.enum';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StorageService } from '../../services/storage.service';

@AutoUnsubscribe()
@Component({
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPage implements OnInit, OnDestroy {

  public refuelingHistoryData: RefuelingHistoryData[] = [];
  constructor(private matDialog: MatDialog,
              private storageService: StorageService,
              private toastService: ToastService) {}

  ngOnInit() {
    this.watchHistoryDataChanges();
  }

  public ngOnDestroy(): void {
  }

  private watchHistoryDataChanges(): void {
    this.storageService.refuelingHistoryData$.subscribe((data: RefuelingHistoryData[]) => {
      this.refuelingHistoryData = data;
    });
  }

  public openNewEntryModal(): void {
    this.matDialog.open(NewEntryComponent).afterClosed().subscribe((response: string) => {
      if (response === DialogComponentResponse.OK) {
        this.toastService.success(ToastMessages.newHistoryEntrySaved);
      }
    });
  }
}
