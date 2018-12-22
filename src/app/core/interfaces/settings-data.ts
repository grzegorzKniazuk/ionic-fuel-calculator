import {MoneyUnits} from "../enums/money-units.enum";
import {FuelUnits} from "../enums/fuel-units.enum";
import {DistanceUnits} from "../enums/distance-units.enum";

export interface SettingsData {
    distanceUnits: DistanceUnits;
    fuelUnits: FuelUnits;
    moneyUnits: MoneyUnits;
}
