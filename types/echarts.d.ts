declare namespace echarts {
    interface ECharts {
        getZr(): ZRender;
    }

    interface ZRender {
        on(eventName: string, handler: Function, context?: object): void;
    }

    interface SliderDataZoomEvent {
        type: 'datazoom';
        // percentage of zoom start position, 0 - 100
        start: number;
        // percentage of zoom finish position, 0 - 100
        end: number;
        batch: undefined;
    }

    interface InsideDataZoomEvent {
        type: 'datazoom';
        batch: SliderDataZoomEvent[];
    }
}
