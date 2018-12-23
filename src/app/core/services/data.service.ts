import {Injectable} from '@angular/core';
import {RefuelingHistoryData} from "../interfaces/refueling-history-data";

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private readonly refuelingHistoryData: RefuelingHistoryData[] = [];

  constructor() { }

  public get refuelingHistory(): RefuelingHistoryData[] {
    return this.refuelingHistoryData;
  }
}
