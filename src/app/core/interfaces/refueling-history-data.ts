export interface RefuelingHistoryData {
    date: Date;
    mileage: number;
    distance?: number;
    amountOfFuel: number;
    fuelCostPerUnit: number;
    fuelCost: number;
}
