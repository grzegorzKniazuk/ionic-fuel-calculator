import { SortType } from '../enums/sort-type.enum';

export interface SortCriteria {
	date: SortType;
	mileage: SortType;
	distance: SortType;
	amountOfFuel: SortType;
	fuelCostPerUnit: SortType;
	fuelCost: SortType;
}
