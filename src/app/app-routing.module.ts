import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'visit-details/:id',
        loadChildren: () => import('./visit-details/visit-details.module').then(m => m.VisitDetailsPageModule)
    },
    {
        path: 'buy-visit/:id',
        loadChildren: () => import('./buy-visit/buy-visit.module').then(m => m.BuyVisitPageModule)
    },
    {
        path: 'plan-visit/:id',
        loadChildren: () => import('./plan-visit/plan-visit.module').then(m => m.PlanVisitPageModule)
    },
    {
        path: 'profile-creation/:user',
        loadChildren: () => import('./profile-creation/profile-creation.module').then(m => m.ProfileCreationPageModule)
    },
  {
    path: 'trip-bought',
    loadChildren: () => import('./trip-bought/trip-bought.module').then( m => m.TripBoughtPageModule)
  },
  {
    path: 'booked-trip-details/:id',
    loadChildren: () => import('./booked-trip-details/booked-trip-details.module').then( m => m.BookedTripDetailsPageModule)
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
