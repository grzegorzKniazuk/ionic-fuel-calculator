export interface RefuelingHistoryData {
	date: Date;
	mileage: number;
	distance?: number;
	averageFuelConsumption?: number;
	amountOfFuel: number;
	fuelCostPerUnit: number;
	fuelCost: number;
}
