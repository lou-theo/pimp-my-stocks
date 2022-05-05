import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MainComponent],
    imports: [SharedModule, RouterModule],
})
export class LayoutModule {}
