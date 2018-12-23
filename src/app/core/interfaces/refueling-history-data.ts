import {NewEntryRefuelingHistoryData} from "./new-entry-refueling-history-data";

export interface RefuelingHistoryData extends NewEntryRefuelingHistoryData {
    averageFuelConsumption: string;
    pricePerDistanceUnit: string;
}
