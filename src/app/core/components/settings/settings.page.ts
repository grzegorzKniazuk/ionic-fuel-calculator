import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../services/form.service";
import {FormGroup} from "@angular/forms";
import {SettingsData} from "../../interfaces/settings-data";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {StorageService} from "../../services/storage.service";
import {take} from "rxjs/operators";

@AutoUnsubscribe()
@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit, OnDestroy {

  private applicationSettings: SettingsData;
  public settingsForm: FormGroup;

  constructor(private formService: FormService,
              private storageService: StorageService) { }

  ngOnInit() {
    this.buildForm();
    this.watchSettings();
    this.watchForm();
  }

  ngOnDestroy(): void {
  }

  private watchSettings(): void {
    this.storageService.applicationSettings$
        .pipe(take(1))
        .subscribe((data: SettingsData) => {
          this.applicationSettings = data;
          this.settingsForm.setValue({
            metricUnits: data.metricUnits,
            moneyUnits: data.moneyUnits,
          });
    });
  }

  private buildForm(): void {
    this.settingsForm = this.formService.settingsForm;
  }

  private watchForm(): void {
    this.settingsForm.valueChanges.subscribe((formStateData: SettingsData) => {
        this.storageService.setApplicationSettings(formStateData);
    });
  }
}
