import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransportMainComponent } from './components/transport-main/transport-main.component';
import { TransportReportComponent } from './components/transport-report/transport-report.component';
import { TransportReportListComponent } from './components/transport-report-list/transport-report-list.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TransportMainComponent, children: [
            {path: '',  redirectTo: 'report-list', pathMatch: 'full'},
            {path: 'report-list',   component: TransportReportListComponent},
            

        ] },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class TransportRoutingModule { }
