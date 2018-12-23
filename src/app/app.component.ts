import {Component} from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageService} from "./core/services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private storageService: StorageService,
              private statusBar: StatusBar) {
    this.initializeApp();
  }

  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storageService.loadApplicationSettings();
    });
  }
}
