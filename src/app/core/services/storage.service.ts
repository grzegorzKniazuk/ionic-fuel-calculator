import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
import { ToastMessages } from '../enums/toast-messages.enum';
import { RefuelingHistoryData } from '../interfaces/refueling-history-data';
import { CarData } from '../interfaces/car-data';

@Injectable({
	providedIn: 'root',
})
export class StorageService {

	public readonly refuelingHistoryData$: BehaviorSubject<RefuelingHistoryData[]> = new BehaviorSubject([]);
	public readonly carData$: BehaviorSubject<CarData> = new BehaviorSubject(null);
	private refuelingHistoryData: RefuelingHistoryData[] = [];
	private elementIndex: number;

	constructor(private storage: Storage,
	            private toastService: ToastService) {
	}

	private get lastIndexRefuelingHistoryData(): number {
		return this.refuelingHistoryData.length - 1;
	}

	private get averageFuelConsumption(): number {
		return this.refuelingHistoryData[this.lastIndexRefuelingHistoryData].amountOfFuel / this.refuelingHistoryData[this.lastIndexRefuelingHistoryData].distance * 100;
	}

	private traveledDistance(data: RefuelingHistoryData): number {
		return data.mileage - this.refuelingHistoryData[this.lastIndexRefuelingHistoryData].mileage;
	}

	public loadRefuelingHistoryData(): void {
		this.storage.get('refueling-history-data').then((data: RefuelingHistoryData[]) => {
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
			this.saveTraveledDistance(data);
			this.calculateAverageFuelConsumption();
		}
		this.addRefuelingEntry(data);
	}

	public deleteDataEntry(mileage: number): void {
		this.refuelingHistoryData = this.refuelingHistoryData.filter((entry: RefuelingHistoryData) => entry.mileage !== mileage);
		this.storage.set('refueling-history-data', this.refuelingHistoryData);
		this.refuelingHistoryData$.next(this.refuelingHistoryData);
		this.toastService.success(ToastMessages.deletedSuccessfully);
	}

	private getElementIndex(mileage: number): number {
		return this.refuelingHistoryData.findIndex((entry: RefuelingHistoryData) => entry.mileage === mileage);
	}

	public modifyDataEntry(mileage: number, data: RefuelingHistoryData): void {
		this.elementIndex = this.getElementIndex(mileage);
		for (const key of Object.keys(this.refuelingHistoryData[this.elementIndex])) {
			if (key === 'distance' && this.refuelingHistoryData[this.elementIndex + 1]) {
				this.refuelingHistoryData[this.elementIndex][key] = this.refuelingHistoryData[this.elementIndex + 1].mileage - data.mileage;
			} else if (key === 'averageFuelConsumption' && this.refuelingHistoryData[this.elementIndex + 1]) {
				this.refuelingHistoryData[this.elementIndex][key] = this.refuelingHistoryData[this.elementIndex + 1].amountOfFuel / this.refuelingHistoryData[this.elementIndex + 1].distance * 100;
			} else if (key === 'fuelCost') {
				this.refuelingHistoryData[this.elementIndex][key] = parseFloat((data.amountOfFuel * data.fuelCostPerUnit).toFixed(2));
			} else {
				this.refuelingHistoryData[this.elementIndex][key] = data[key];
			}
		}
		this.storage.set('refueling-history-data', this.refuelingHistoryData).then(() => {
			this.loadRefuelingHistoryData();
		});
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

	private saveTraveledDistance(data: RefuelingHistoryData): void {
		this.refuelingHistoryData[this.lastIndexRefuelingHistoryData].distance = this.traveledDistance(data);
		this.modifyDataEntry(this.refuelingHistoryData[this.lastIndexRefuelingHistoryData].mileage, this.refuelingHistoryData[this.lastIndexRefuelingHistoryData]);
	}

	private calculateAverageFuelConsumption(): void {
		this.refuelingHistoryData[this.refuelingHistoryData.length - 1].averageFuelConsumption = this.averageFuelConsumption;
	}

	private addRefuelingEntry(data: RefuelingHistoryData): void {
		this.refuelingHistoryData.push(data);
		this.storage.set('refueling-history-data', this.refuelingHistoryData).then(() => {
			this.loadRefuelingHistoryData();
			this.toastService.success(ToastMessages.savedSuccessfully);
		}).catch((error) => {
			this.toastService.error(error);
		});
	}
}
