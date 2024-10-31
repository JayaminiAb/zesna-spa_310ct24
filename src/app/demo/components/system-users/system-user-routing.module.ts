import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserMainComponent } from './components/user-main/user-main.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UserMainComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SystemUsersRoutingModule { }
