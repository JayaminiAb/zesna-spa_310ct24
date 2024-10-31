import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '',  redirectTo: 'auth', pathMatch: 'full' },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            {
                path: 'main', component: AppLayoutComponent,
                children: [
                    
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'petty_cash', loadChildren: () => import('./demo/components/petty_cash/petty-cash.module').then(m => m.PettyCashModule)},
                    { path: 'estate_mange', loadChildren: () => import('./demo/components/estate-management/estate-management.module').then(m => m.EstateManagementModule)},
                    { path: 'user_mange', loadChildren: () => import('./demo/components/system-users/system-users.module').then(m => m.SystemUsersModule)},
                    { path: 'employee', loadChildren: () => import('./demo/components/employee-management/employee-management.module').then(m => m.EmployeeManagementModule)},
                    { path: 'transport', loadChildren: () => import('./demo/components/transport/transport.module').then(m => m.TransportModule)},
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
