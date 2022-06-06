import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from '@features/home/home-routing.module';
import { HomeComponent } from '@features/home/home.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, HomeRoutingModule],
    declarations: [HomeComponent],
    exports: [HomeRoutingModule],
})
export class HomeModule {}
