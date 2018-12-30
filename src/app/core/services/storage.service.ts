import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {SettingsData} from '../interfaces/settings-data';
import {BehaviorSubject} from 'rxjs';
import {ToastService} from './toast.service';
import {ToastMessages} from '../enums/toast-messages.enum';
import {MoneyUnits} from '../enums/money-units.enum';
import {MetricUnits} from '../enums/metric-units.enum';
import {RefuelingHistoryData} from '../interfaces/refueling-history-data';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private refuelingHistoryData: RefuelingHistoryData[] = [];
  public readonly refuelingHistoryData$: BehaviorSubject<RefuelingHistoryData[]> = new BehaviorSubject<RefuelingHistoryData[]>([]);
  public readonly applicationSettings$: BehaviorSubject<SettingsData> = new BehaviorSubject<SettingsData>(null);

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
        this.toastService.success(ToastMessages.defaultSettingsLoaded);
        this.applicationSettings$.next({
          metricUnits: MetricUnits.PL,
          moneyUnits: MoneyUnits.pln,
        });
      }
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
    // TODO save new entry
    this.loadRefuelingHistoryData();
    this.refuelingHistoryData.push(data);
    console.log(this.refuelingHistoryData);
    this.storage.set('data', this.refuelingHistoryData).then(() => {
      this.loadRefuelingHistoryData();
      console.log(this.refuelingHistoryData);
      this.toastService.success(ToastMessages.savedSuccessfully);
    }).catch((error) => {
      this.toastService.error(error);
    });
  }
}
