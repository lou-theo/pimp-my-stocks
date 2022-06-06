import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteInfoComponent } from './quote-info.component';

const routes: Routes = [
    {
        path: 'quote-info',
        component: QuoteInfoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuoteInfoRoutingModule {}
