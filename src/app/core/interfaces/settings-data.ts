import {MoneyUnits} from "../enums/money-units.enum";
import {MetricUnits} from "../enums/metric-units.enum";

export interface SettingsData {
    metricUnits: MetricUnits;
    moneyUnits: MoneyUnits;
}
