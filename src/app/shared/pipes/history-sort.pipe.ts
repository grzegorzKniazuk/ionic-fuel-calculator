import { Pipe, PipeTransform } from '@angular/core';
import { RefuelingHistoryData } from '../../core/interfaces/refueling-history-data';
import { RefuelingSortCriteria } from '../../core/interfaces/refueling-sort-criteria';
import { SortType } from '../../core/enums/sort-type.enum';
import { RefuelingSortCriteriaType } from '../../core/enums/refueling-sort-criteria-type.enum';

@Pipe({
	name: 'historySort',
})
export class HistorySortPipe implements PipeTransform {

	private refuelingHistoryData: RefuelingHistoryData[];

	transform(data: RefuelingHistoryData[], criteria: RefuelingSortCriteria): RefuelingHistoryData[] {
		this.refuelingHistoryData = data;
		if (criteria) {
			if (criteria.date) {
				this.refuelingHistoryData = this.sortBy(RefuelingSortCriteriaType.date, data, criteria);
			}
			if (criteria.mileage) {
				this.refuelingHistoryData = this.sortBy(RefuelingSortCriteriaType.mileage, data, criteria);
			}
			if (criteria.distance) {
				this.refuelingHistoryData = this.sortBy(RefuelingSortCriteriaType.distance, data, criteria);
			}
			if (criteria.amountOfFuel) {
				this.refuelingHistoryData = this.sortBy(RefuelingSortCriteriaType.amountOfFuel, data, criteria);
			}
			if (criteria.fuelCostPerUnit) {
				this.refuelingHistoryData = this.sortBy(RefuelingSortCriteriaType.fuelCostPerUnit, data, criteria);
			}
			if (criteria.fuelCost) {
				this.refuelingHistoryData = this.sortBy(RefuelingSortCriteriaType.fuelCost, data, criteria);
			}
			return this.refuelingHistoryData;
		} else {
			return data;
		}
	}

	private sortBy(sortBy: RefuelingSortCriteriaType, data: RefuelingHistoryData[], criteria: RefuelingSortCriteria): RefuelingHistoryData[] {
		return data.sort((a: RefuelingHistoryData, b: RefuelingHistoryData) => {
			if (criteria[sortBy] === SortType.ASC) {
				return a[sortBy] > b[sortBy] ? 1 : -1;
			} else if (criteria.date === SortType.DESC) {
				return a[sortBy] < b[sortBy] ? 1 : -1;
			}
		});
	}
}
