import { SetlocalnotificationService } from './service/setlocalnotification.service';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Market } from '@ionic-native/market/ngx';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MinuteSecondsPipe } from './minute-seconds.pipe';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from './share/share.module';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';
import { MenulistPipe } from './menulist.pipe';

import { Network } from '@ionic-native/network/ngx';
import { AboutusPipe } from './aboutus.pipe';

import { Media} from '@ionic-native/media/ngx';
import { NewapiService } from './newapi.service';
import { Downloader } from '@ionic-native/downloader/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DownloadService } from './service/download.service';
import { DownloadplayService } from './service/downloadplay.service';
import { DatePipe } from '@angular/common';
import { PlaynewmediaService } from './service/playnewmedia.service';
import { AutoloadService } from './service/autoload.service';
import { OfflinealertPageModule } from './offlinealert/offlinealert.module';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
//import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent, MenulistPipe, AboutusPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ShareModule,
    OfflinealertPageModule,
    SuperTabsModule.forRoot(),
    //IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    NewapiService,
    DownloadService,
    DownloadplayService,
    MusicControls,
    ScreenOrientation,
    Media,
    Downloader,
    File,
    FileTransfer,
    Market,
    DatePipe,
    PlaynewmediaService,
    AutoloadService,
    SetlocalnotificationService,
    Network,
    AndroidPermissions,
    FirebaseDynamicLinks,
    AuthGuard,
    DeviceOrientation,
    Geolocation,
    NativeGeocoder,
    BackgroundMode
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
