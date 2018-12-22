import {SettingsData} from "../interfaces/settings-data";
import {Storage} from "@ionic/storage";
import {ToastService} from "../services/toast.service";

export abstract class CalculatorPage {

    public applicationSettings: SettingsData;

    protected constructor(protected storage: Storage,
                          protected toastService: ToastService) {}

    protected loadApplicationSettings(): void {
        this.storage.get('settings').then((settings: SettingsData) => {
            this.applicationSettings = settings;
        }).catch((error) => {
            this.toastService.error(error);
        });
    }
}
