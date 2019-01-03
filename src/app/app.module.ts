import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      AppRoutingModule,
      MaterialModule,
      BrowserAnimationsModule,
  ],
  providers: [
      StatusBar,
      SplashScreen,
      // Camera,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [
      AppComponent,
  ],
})
export class AppModule {}
