import { InteractionModeMap, Chart, PluginOptionsByType } from 'chart.js';
import { CrosshairOptions } from 'chartjs-plugin-crosshair';

declare module 'chart.js' {
    interface InteractionModeMap {
        interpolate: InteractionModeFunction;
    }

    interface PluginOptionsByType {
        crosshair: CrosshairOptions | undefined;
    }

    interface Chart {
        panZoom: (increment: number) => void;
    }
}
