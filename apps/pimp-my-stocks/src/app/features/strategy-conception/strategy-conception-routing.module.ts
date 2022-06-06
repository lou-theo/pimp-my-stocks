import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrategyConceptionComponent } from './strategy-conception.component';

const routes: Routes = [
    {
        path: 'strategy-conception',
        component: StrategyConceptionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StrategyConceptionRoutingModule {}
