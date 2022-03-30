import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinuteSecondsPipe } from '../minute-seconds.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchPipe } from '../search.pipe';
import { AudiosearchPipe } from '../audiosearch.pipe';
import { BooksearchPipe } from '../booksearch.pipe';
import { ChaptersearchPipe } from '../chaptersearch.pipe';
import { HighlightPipe } from '../highlight.pipe';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IntercepterService } from '../intercepter.service';
import { MarqueeDirective } from './marquee.directive';
import { OfflinealertPageModule } from '../offlinealert/offlinealert.module';
import { RemoveISTPipe } from './remove-ist.pipe';


@NgModule({
  declarations: [
    MinuteSecondsPipe,
    SearchPipe,
    AudiosearchPipe,
    BooksearchPipe,
    ChaptersearchPipe,
    HighlightPipe,
    MarqueeDirective, RemoveISTPipe
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    SuperTabsModule
  ],
  providers: [ SocialSharing,
    {
      provide : HTTP_INTERCEPTORS , useClass : IntercepterService , multi : true
     }
  ],
  exports: [MinuteSecondsPipe,
    LazyLoadImageModule,
    SearchPipe,
    AudiosearchPipe,
    BooksearchPipe,
    ChaptersearchPipe,
    HighlightPipe,
    RemoveISTPipe,
    SuperTabsModule
  ]
})
export class ShareModule { }
