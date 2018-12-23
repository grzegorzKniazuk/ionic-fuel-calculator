import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";

@Component({
  templateUrl: './calculator.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPage implements OnInit {

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.loadRefuelingHistoryData();
  }
}
