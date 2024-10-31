import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstateMainComponent } from './components/estate-main/estate-main.component';
import { EstateManagementComponent } from './components/estate-management/estate-management.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EstateMainComponent, children: [
            {path: '',  redirectTo: 'manage', pathMatch: 'full'},
            {path: 'manage',   component: EstateManagementComponent}

        ] },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EstateManagementRoutingModule { }
