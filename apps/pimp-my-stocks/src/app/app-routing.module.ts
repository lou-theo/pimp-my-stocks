import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/layout/components/main/main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        loadChildren: () =>
            import('./modules/pages/pages.module').then((m) => m.PagesModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
