declare namespace echarts {
    interface ECharts {
        getZr(): ZRender;
    }

    interface ZRender {
        on(eventName: string, handler: Function, context?: object): void;
    }
}
