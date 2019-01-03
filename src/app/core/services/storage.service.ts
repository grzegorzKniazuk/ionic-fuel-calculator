import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {ToastService} from './toast.service';
import {ToastMessages} from '../enums/toast-messages.enum';
import {RefuelingHistoryData} from '../interfaces/refueling-history-data';
import { CarData } from '../interfaces/car-data';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private refuelingHistoryData: RefuelingHistoryData[] = [];
  public readonly refuelingHistoryData$: BehaviorSubject<RefuelingHistoryData[]> = new BehaviorSubject([]);
  public readonly carData$: BehaviorSubject<CarData> = new BehaviorSubject(null);

  constructor(private storage: Storage,
              private toastService: ToastService) { }

  public loadRefuelingHistoryData(): void {
    this.storage.get('data').then((data: RefuelingHistoryData[]) => {
      if (data) {
        this.refuelingHistoryData = data;
        this.refuelingHistoryData$.next(data);
      } else {
        this.refuelingHistoryData = [];
        this.refuelingHistoryData$.next([]);
      }
    });
  }

  public saveNewRefuelingDataEntry(data: RefuelingHistoryData): void {
    this.loadRefuelingHistoryData();
    if (this.refuelingHistoryData.length >= 1) {
      this.refuelingHistoryData[this.refuelingHistoryData.length - 1].distance = data.mileage - this.refuelingHistoryData[this.refuelingHistoryData.length - 1].mileage;
    }
    this.modifyDataEntry(this.refuelingHistoryData[this.refuelingHistoryData.length - 1].mileage,
        this.refuelingHistoryData[this.refuelingHistoryData.length - 1]);
    this.addEntry(data);
  }

   private addEntry(data: RefuelingHistoryData): void {
     this.refuelingHistoryData.push(data);
     this.storage.set('data', this.refuelingHistoryData).then(() => {
       this.loadRefuelingHistoryData();
       this.toastService.success(ToastMessages.savedSuccessfully);
     }).catch((error) => {
       this.toastService.error(error);
     });
   }

   private modifyEntryArray(mileage: number): void {
     this.refuelingHistoryData = this.refuelingHistoryData.filter((entry: RefuelingHistoryData) => entry.mileage !== mileage);
   }

  public deleteDataEntry(mileage: number): void {
  	this.modifyEntryArray(mileage);
  	this.storage.set('data', this.refuelingHistoryData);
  	this.refuelingHistoryData$.next(this.refuelingHistoryData);
	  this.toastService.success(ToastMessages.deletedSuccessfully);
  }

  public modifyDataEntry(mileage: number, data: RefuelingHistoryData): void {
    this.modifyEntryArray(mileage);
    this.addEntry(data);
  }

  public loadCarData(): void {
    this.storage.get('car-data').then((carData: CarData) => {
      if (carData) {
        this.carData$.next(carData);
      }
    });
  }

  public updateCarData(data: CarData): void {
    this.storage.set('car-data', data);
    this.loadCarData();
    this.toastService.success(ToastMessages.savedSuccessfully);
  }
}
