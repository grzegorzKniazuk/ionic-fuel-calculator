import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CarData } from '../../interfaces/car-data';
import { MatDialog } from '@angular/material';
import { UpdateFormComponent } from './update-form/update-form.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { DialogComponentResponse } from '../../enums/dialog-component-response.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.page.html',
  styleUrls: ['./car-info.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarInfoPage implements OnInit, OnDestroy {

  public carData: CarData;

  constructor(private storageService: StorageService,
              private matDialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.storageService.loadCarData();
    this.watchCarData();
  }

  public ngOnDestroy(): void {
  }

  public updateCarData(): void {
    this.matDialog.open(UpdateFormComponent, {
      data: this.carData,
    }).afterClosed().subscribe((response: DialogComponentResponse) => {
      if (response === DialogComponentResponse.saved) {
        this.storageService.loadCarData();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  private watchCarData(): void {
    this.storageService.carData$.subscribe((data: CarData) => {
      this.carData = data;
      this.changeDetectorRef.detectChanges();
    });
  }
}
