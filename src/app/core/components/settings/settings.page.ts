import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { FormService } from "../../services/form.service";
import { FormGroup } from "@angular/forms";
import { SettingsData } from "../../interfaces/settings-data";
import {ToastService} from "../../services/toast.service";
import {ToastMessages} from "../../enums/toast-messages.enum";
import { Storage } from '@ionic/storage';
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {DistanceUnits} from "../../enums/distance-units.enum";
import {FuelUnits} from "../../enums/fuel-units.enum";

@AutoUnsubscribe()
@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit, OnDestroy {

  public settingsForm: FormGroup;
  private applicationSettingsData: SettingsData;

  constructor(private formService: FormService, private toastService: ToastService, private storage: Storage) { }

  ngOnInit() {
    this.buildForm();
    this.loadSettings();
    this.watchForm();
  }

  ngOnDestroy(): void {
  }

  private loadSettings(): void {
    if (this.storage.get('settings')) {
      this.storage.get('settings').then((data) => {
        this.applicationSettingsData = data;
        this.settingsForm.setValue(this.applicationSettingsData);
      }).catch((error) => {
        this.toastService.error(error);
      });
    }
  }

  private buildForm(): void {
    this.settingsForm = this.formService.settingsForm;
  }

  private watchForm(): void {
    this.settingsForm.valueChanges
        .subscribe((formStateData: SettingsData) => {
          this.storage.set('settings', formStateData).then(() => {
            this.toastService.success(ToastMessages.settingsSaved);
          }).catch((error) => {
            this.toastService.error(error);
          });
    });
  }

  public setFuelUnits(): void {

  }

  public setDistanceUnits(): void {

  }
}
