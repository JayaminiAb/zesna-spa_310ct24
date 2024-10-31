import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PettyCashMainComponent } from './components/petty-cash-main/petty-cash-main.component';
import { ReimbursingComponent } from './components/reimbursing/reimbursing.component';
import { ReportComponent } from './components/report/report.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: PettyCashMainComponent,
            children: [
                { path: '',  redirectTo: 'reimbursing', pathMatch: 'full' },
                { path: 'reimbursing',  component: ReimbursingComponent },
                { path: 'report',  component: ReportComponent },
            ]
        },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PettyCashRoutingModule { }
