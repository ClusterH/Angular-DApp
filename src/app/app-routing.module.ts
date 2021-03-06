import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule, PreloadingStrategy } from '@angular/router';
import { Observable } from "rxjs";
import { of } from 'rxjs/internal/observable/of';

import { } from './modules/home/pages/home.component';
export class PreloadPublicModules implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'transfer', loadChildren: () => import('./modules/transfer/transfer.module').then(m => m.TransferModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadPublicModules
    })
  ],
  exports: [RouterModule],
  providers: [PreloadPublicModules]
})

export class AppRoutingModule { }
