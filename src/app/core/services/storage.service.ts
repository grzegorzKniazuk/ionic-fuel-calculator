import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {SettingsData} from '../interfaces/settings-data';
import {BehaviorSubject} from 'rxjs';
import {ToastService} from './toast.service';
import {ToastMessages} from '../enums/toast-messages.enum';
import {MoneyUnits} from '../enums/money-units.enum';
import {MetricUnits} from '../enums/metric-units.enum';
import {RefuelingHistoryData} from '../interfaces/refueling-history-data';
import { SortCriteria } from '../interfaces/sort-criteria';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private refuelingHistoryData: RefuelingHistoryData[] = [];
  public readonly refuelingHistoryData$: BehaviorSubject<RefuelingHistoryData[]> = new BehaviorSubject<RefuelingHistoryData[]>([]);
  public readonly applicationSettings$: BehaviorSubject<SettingsData> = new BehaviorSubject<SettingsData>(null);
  public readonly sortCriteriaSettings$: BehaviorSubject<SortCriteria> = new BehaviorSubject<SortCriteria>(null);

  constructor(private storage: Storage, private toastService: ToastService) { }

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

  public loadApplicationSettings(): void {
    this.storage.get('settings').then((data: SettingsData) => {
      if (data) {
        this.applicationSettings$.next(data);
      } else {
        this.setDefaultApplicationSettings();
      }
    });
  }

  private setDefaultApplicationSettings(): void {
    this.storage.set('settings', {
      metricUnits: MetricUnits.PL,
      moneyUnits: MoneyUnits.pln,
    }).then(() => {
      this.toastService.success(ToastMessages.defaultSettingsLoaded);
      this.applicationSettings$.next({
        metricUnits: MetricUnits.PL,
        moneyUnits: MoneyUnits.pln,
      });
    });
  }

  public setApplicationSettings(settings: SettingsData): void {
    this.storage.set('settings', settings).then(() => {
      this.toastService.success(ToastMessages.settingsSaved);
      this.loadApplicationSettings();
    }).catch((error) => {
      this.toastService.error(error);
    });
  }

  public saveNewRefuelingDataEntry(data: RefuelingHistoryData): void {
    this.loadRefuelingHistoryData();
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

   private modifyEntryArray(mileage: string): void {
     this.refuelingHistoryData = this.refuelingHistoryData.filter((entry: RefuelingHistoryData) => entry.mileage !== mileage);
   }

  public deleteDataEntry(mileage: string): void {
  	this.modifyEntryArray(mileage);
  	this.storage.remove('data');
  	this.storage.set('data', this.refuelingHistoryData);
  	this.refuelingHistoryData$.next(this.refuelingHistoryData);
	  this.toastService.success(ToastMessages.deletedSuccessfully);
  }

  public modifyDataEntry(mileage: string, data: RefuelingHistoryData): void {
    this.modifyEntryArray(mileage);
    this.addEntry(data);
  }

  public updateSortCriteria(criteria: SortCriteria): void {
    this.sortCriteriaSettings$.next(criteria);
  }
}
