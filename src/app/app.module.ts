import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Market } from '@ionic-native/market/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MinuteSecondsPipe } from './minute-seconds.pipe';
import { ApiService } from './api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShareModule } from './share/share.module';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { MenulistPipe } from './menulist.pipe';
import { BookmodalPageModule } from './bookmodal/bookmodal.module';
import { Network } from '@ionic-native/network/ngx';
import { AboutusPipe } from './aboutus.pipe';
import { IntercepterService } from './intercepter.service';
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

@NgModule({
  declarations: [AppComponent, MenulistPipe, AboutusPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ShareModule,
    OfflinealertPageModule
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
    Network,
    AndroidPermissions,
    FirebaseDynamicLinks,
    AuthGuard,
    DeviceOrientation,
    Geolocation,
    NativeGeocoder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
