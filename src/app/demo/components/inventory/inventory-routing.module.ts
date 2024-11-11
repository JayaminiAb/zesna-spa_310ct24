import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { InvoicesCrudComponent } from './components/invoices-crud/invoices-crud.component';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: InvoicesComponent,
            children: [
                { path: '',  redirectTo: 'invoice_list', pathMatch: 'full' },
                { path: 'invoice_list',  component: InvoicesListComponent },
                { path: 'invoice_crud/:invoiceId',  component: InvoicesCrudComponent },
            ]
        },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
