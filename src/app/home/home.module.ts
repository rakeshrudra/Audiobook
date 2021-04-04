import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ShareModule } from '../share/share.module';
import { SliderService } from '../resolver/slider.service';
import { ModuleService } from '../resolver/module.service';
import { BookService } from '../resolver/book.service';
import { ChaptersService } from '../resolver/chapters.service';
import { BooksService } from '../resolver/books.service';
import { AudiosService } from '../resolver/audios.service';
import { AllbooksService } from '../resolver/allbooks.service';
import { TrandingaudioService } from '../resolver/trandingaudio.service';
import { HistoryService } from '../resolver/history.service';
import { TopicService } from '../resolver/topic.service';
import { TopicaudioService } from '../resolver/topicaudio.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children :[
          {
            path: 'landing',
            loadChildren: () => import('../landing/landing.module').then(m => m.LandingPageModule),
            resolve : {  trandingaudio : TrandingaudioService}
          },
          {
            path: 'book',
            loadChildren: () => import('../book/book.module').then(m => m.BookPageModule)
          },
          {
            path: 'book/:module',
            loadChildren: () => import('../book/book.module').then(m => m.BookPageModule),
            //resolve : {books : BookService}
          },
          {
            path: 'chapter/:book',
            loadChildren: () => import('../chapter/chapter.module').then(m => m.ChapterPageModule),
           // resolve : {chapters : ChaptersService, book : BooksService}
          },
          {
            path: 'audio',
            loadChildren: () => import('../audio/audio.module').then(m => m.AudioPageModule)
          },{
            path: 'audio/:id',
            loadChildren: () => import('../audio/audio.module').then(m => m.AudioPageModule),
           // resolve : {audios : AudiosService}
          },{
            path: 'audiotop/:id',
            loadChildren: () => import('../audiotop/audiotop.module').then(m => m.AudiotopPageModule),
            // resolve : {topic : TopicService}
          },{
            path: 'topicaudiolist/:id',
            loadChildren: () => import('../topicaudiolist/topicaudiolist.module').then(m => m.TopicaudiolistPageModule),
           // resolve : {audios : TopicaudioService}
          },
          {
            path: 'play',
            loadChildren: () => import('../play/play.module').then(m => m.PlayPageModule) ,
            resolve : {module : ModuleService}

          }
        ]

      }

    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
