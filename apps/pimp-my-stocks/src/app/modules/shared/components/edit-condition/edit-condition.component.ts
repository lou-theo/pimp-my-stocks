import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AggregationTypeLabelMapping } from '@sic/core/conditions';
import { IndicatorService } from '@sic/core/services';
@Component({
    selector: 'sic-edit-condition',
    templateUrl: './edit-condition.component.html',
    styleUrls: ['./edit-condition.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditConditionComponent {
    AggregationTypeLabelMapping = AggregationTypeLabelMapping;

    constructor(public readonly indicatorService: IndicatorService) {}
}
