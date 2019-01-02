import { SortType } from '../enums/sort-type.enum';

export interface RefuelingSortCriteria {
	date: SortType;
	mileage: SortType;
	distance: SortType;
	amountOfFuel: SortType;
	fuelCostPerUnit: SortType;
	fuelCost: SortType;
}
