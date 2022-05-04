import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    AfterViewInit,
    ElementRef,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
    selector: 'sic-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements AfterViewInit {
    @ViewChild('myChart') child!: ElementRef<HTMLCanvasElement>;

    ngAfterViewInit() {
        const ctx: CanvasRenderingContext2D | null =
            this.child.nativeElement.getContext('2d');

        if (ctx === null) {
            return;
        }

        const labels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
        ];
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };

        const myChart = new Chart(ctx, {
            type: 'line',
            data: data,
        });
    }
}
