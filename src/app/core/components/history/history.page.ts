import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RefuelingHistoryData} from "../../interfaces/refueling-history-data";
import {MatDialog} from "@angular/material";
import {NewEntryComponent} from "./new-entry/new-entry.component";
import {ToastService} from "../../services/toast.service";
import {ToastMessages} from "../../enums/toast-messages.enum";
import {DialogComponentResponse} from "../../enums/dialog-component-response.enum";
import {DataService} from "../../services/data.service";

@Component({
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPage implements OnInit {

  public refuelingHistoryData: RefuelingHistoryData[] = [];
  constructor(private matDialog: MatDialog,
              private dataService: DataService,
              private toastService: ToastService) {}

  ngOnInit() {
  }

  public openNewEntryModal(): void {
    this.matDialog.open(NewEntryComponent).afterClosed().subscribe((response: string) => {
      if (response === DialogComponentResponse.OK) {
        this.toastService.success(ToastMessages.newHistoryEntrySaved);
      }
    });
  }
}
