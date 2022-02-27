import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash', //loadChildren: '../app/splash/splash.module#SplashPageModule'
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)

  },
  {
    path: 'tab',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'landing', //loadChildren: './landing/landing.module#LandingPageModule'
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)

  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)

  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)

  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)

  },
  {
    path: 'mainsearch',
    loadChildren: () => import('./mainsearch/mainsearch.module').then(m => m.MainsearchPageModule)

  },
  {
    path: 'player',
    loadChildren: () => import('./player/player.module').then(m => m.PlayerPageModule)

  },
  {
    path: 'module',
    loadChildren: () => import('./resolver/module/module.module').then(m => m.ModulePageModule)

  },
  {
    path: 'allbooks',
    loadChildren: () => import('./resolver/allbooks/allbooks.module').then(m => m.AllbooksPageModule)

  },
  {
    path: 'topicaudiolist',
    loadChildren: () => import('./topicaudiolist/topicaudiolist.module').then(m => m.TopicaudiolistPageModule)

  },
  {
    path: 'loader',
    loadChildren: () => import('./loader/loader.module').then(m => m.LoaderPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqPageModule)

  },
  {
    path: 'download',
    loadChildren: () => import('./download/download.module').then(m => m.DownloadPageModule)

  },
  {
    path: 'social',
    loadChildren: () => import('./social/social.module').then(m => m.SocialPageModule)

  },
  {
    path: 'testimonial',
    loadChildren: () => import('./testimonial/testimonial.module').then(m => m.TestimonialPageModule)
  },
  {
    path: 'offlinealert',
    loadChildren: () => import('./offlinealert/offlinealert.module').then(m => m.OfflinealertPageModule)

  },
  {
    path: 'downloadfilter',
    loadChildren: () => import('./downloadfilter/downloadfilter.module').then(m => m.DownloadfilterPageModule)
  },
  {
    path: 'downloadchapterfilter',
    loadChildren: () => import('./downloadchapterfilter/downloadchapterfilter.module').then(m => m.DownloadchapterfilterPageModule)

  },
  {
    path: 'downloadsubchapterfilter',
    loadChildren: () => import('./downloadsubchapterfilter/downloadsubchapterfilter.module').then(m => m.DownloadsubchapterfilterPageModule)

  },
  {
    path: '',// loadChildren: './firstlunch/firstlunch.module#FirstlunchPageModule'
    loadChildren: () => import('../app/firstlunch/firstlunch.module').then(m => m.FirstlunchPageModule)

  },  {
    path: 'prayer-time',
    loadChildren: () => import('./prayer-time/prayer-time.module').then( m => m.PrayerTimePageModule)
  },
  {
    path: 'qubla-location',
    loadChildren: () => import('./qubla-location/qubla-location.module').then( m => m.QublaLocationPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
