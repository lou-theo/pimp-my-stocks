declare module 'ta.web' {
    /**
     * Relative Strength Index (RSI).
     * @param data
     * @param length default = 14
     */
    export function rsi(
        data: number[],
        length?: number = 14
    ): Promise<number[]>;

    /**
     * True Strength Index (TSI).
     * @param data
     * @param long default = 25
     * @param short default = 13
     * @param signal default = 13
     * @returns Array of [strength line, signal line]
     */
    export function tsi(
        data: number[],
        long?: number,
        short?: number,
        signal?: number
    ): Promise<number[][]>;
    export function fi(data: any, length?: number): Promise<any[]>;
    export function pr(data: any, length?: number): Promise<number[]>;
    export function stoch(
        data: any,
        length?: number,
        smoothd?: number,
        smoothk?: number
    ): Promise<number[][]>;
    export function atr(data: any, length?: number): Promise<number[]>;

    /**
     * Simple Moving Average (SMA).
     * @param data
     * @param length default = 14
     */
    export function sma(data: number[], length?: number): Promise<number[]>;

    export function smma(data: any, length?: number): Promise<number[]>;
    export function wma(data: any, length?: number): Promise<number[]>;
    export function vwma(data: any, length?: number): Promise<number[]>;
    export function ao(
        data: any,
        length1?: number,
        length2?: number
    ): Promise<number[]>;
    export function asi(data: any): Promise<number[]>;
    export function ema(data: any, length?: number): Promise<any[]>;
    export function macd(
        data: any,
        length1?: number,
        length2?: number
    ): Promise<number[]>;
    export function lsma(data: any, length?: number): Promise<number[]>;
    export function don(data: any, length?: number): Promise<any[][]>;
    export function ichimoku(
        data: any,
        length1?: number,
        length2?: number,
        length3?: number,
        length4?: number
    ): Promise<any[][]>;
    export function bands(
        data: any,
        length?: number,
        deviations?: number
    ): Promise<number[][]>;
    export function bandwidth(
        data: any,
        length?: number,
        deviations?: number
    ): Promise<number[]>;
    export function median(data: any, length?: any): Promise<any[]>;
    export function keltner(
        data: any,
        length?: number,
        devi?: number
    ): Promise<number[][]>;
    export function std(data: any, length?: any): Promise<number>;
    export function cor(data1: any, data2: any): Promise<number>;
    export function dif(n: any, o: any): Promise<number>;
    export function hull(data: any, length?: number): Promise<number[]>;
    export function mfi(data: any, length?: number): Promise<number[]>;
    export function roc(data: any, length?: number): Promise<number[]>;
    export function kst(
        data: any,
        r1?: number,
        r2?: number,
        r3?: number,
        r4?: number,
        s1?: number,
        s2?: number,
        s3?: number,
        s4?: number,
        sig?: number
    ): Promise<number[][]>;

    /**
     * On-Balance Volume.
     * @param data Array of [asset volume, close price]
     */
    export function obv(data: number[][]): Promise<number[]>;

    export function vwap(data: any, length?: any): Promise<number[]>;
    export function mom(data: any, length: number, p: any): Promise<number[]>;
    export function mom_osc(data: any, length?: number): Promise<number[]>;
    export function ha(data: any): Promise<number[][]>;
    export function ren(data: any, bs?: number): Promise<number[][]>;
    export function bop(data: any, len?: number): Promise<any>;
    export function cop(
        data: any,
        len1?: number,
        len2?: number,
        len3?: number
    ): Promise<number[]>;
    export function kama(
        data: any,
        len1?: number,
        len2?: number,
        len3?: number
    ): Promise<number[]>;
    export function mad(data: any, length?: any): Promise<any[]>;
    export function aad(data: any, length?: any): Promise<number[]>;
    export function variance(data: any, length?: any): Promise<number[]>;
    export function ssd(data: any, length?: any): Promise<number[]>;
    export function pwma(data: any, length?: number): Promise<number[]>;
    export function hwma(data: any, length?: number): Promise<number[]>;
    export function kmeans(data: any, clusters: any): Promise<any[][]>;
    export function drawdown(d: any): Promise<number>;
    export function normalize(data: any, marg?: number): Promise<number[]>;
    export function denormalize(
        data: any,
        norm: any,
        marg?: number
    ): Promise<number[]>;
    export function wrsi(data: any, length?: number): Promise<number[]>;
    export function wsma(data: any, length?: number): Promise<any[]>;
    export function normsinv(p: any): Promise<number>;
    export function ncdf(x: any, mean: any, std: any): Promise<number>;
    export function sim(
        d: any,
        length: number,
        sims: number,
        perc: any
    ): Promise<any[]>;
    export function percentile(data: any, perc: any): Promise<any[]>;
    export function envelope(
        data: any,
        len?: number,
        p?: number
    ): Promise<number[][]>;
    export function chaikin_osc(
        data: any,
        ema1?: number,
        ema2?: number
    ): Promise<number[]>;
    export function fractals(data: any): Promise<boolean[][]>;
    export function recent_high(
        data: any,
        lb?: number
    ): Promise<{
        index: number;
        value: any;
    }>;
    export function recent_low(
        data: any,
        lb?: number
    ): Promise<{
        index: number;
        value: any;
    }>;
    export function support(
        d: any,
        hl?: Promise<{
            index: number;
            value: any;
        }>
    ): Promise<{
        calculate: (pos: any) => Promise<any>;
        slope: any;
        lowest: any;
        index: any;
    }>;
    export function resistance(
        d: any,
        hl: any
    ): Promise<{
        calculate: (pos: any) => Promise<any>;
        slope: any;
        highest: any;
        index: any;
    }>;
    export function ac(
        data: any,
        len1?: number,
        len2?: number
    ): Promise<number[]>;
    export function fib(start: any, end: any): Promise<any[]>;
    export function alligator(
        data: any,
        jl?: number,
        tl?: number,
        ll?: number,
        js?: number,
        ts?: number,
        ls?: number
    ): Promise<number[][]>;
    export function gator(
        data: any,
        jl?: number,
        tl?: number,
        ll?: number,
        js?: number,
        ts?: number,
        ls?: number
    ): Promise<number[][]>;
    export function standardize(data: any): Promise<number[]>;
    export function er(data: any): Promise<number>;
    export function winratio(data: any): Promise<number>;
    export function avgwin(data: any): Promise<number>;
    export function avgloss(data: any): Promise<number>;
    export function fisher(data: any, len: any): Promise<number[][]>;
    export function cross(
        d1: any,
        d2: any
    ): Promise<
        {
            index: number;
            cross: boolean;
        }[]
    >;
    export function se(data: any, size: any): Promise<number>;
    export function kelly(data: any): Promise<number>;
    export function normalize_pair(data1: any, data2: any): Promise<number[][]>;
    export function normalize_from(data: any, value: any): Promise<any[]>;
    export function ar(data: any, len?: any): Promise<number[]>;
    export function zscore(data: any, len?: any): Promise<number[]>;
    export function log(d: any): Promise<any>;
    export function exp(d: any): Promise<any>;
    export function halftrend(
        data: any,
        atrlen: any,
        amplitude: any,
        deviation: any
    ): Promise<(string | number)[][]>;
    export function sum(data: any): Promise<any>;
    export function covariance(
        data1: any,
        data2: any,
        length: any
    ): Promise<number[]>;
    export function zigzag(data: any, perc?: number): Promise<any[]>;
    export function psar(
        data: any,
        step?: number,
        max?: number
    ): Promise<any[]>;
    export function macd_signal(
        data: any,
        length1?: number,
        length2?: number,
        lengthsig?: number
    ): Promise<any[]>;
    export function macd_bars(
        data: any,
        length1?: number,
        length2?: number,
        lengthsig?: number
    ): Promise<number[]>;
    export declare namespace aroon {
        declare function up(data: any, length?: number): Promise<number[]>;
        declare function down(data: any, length?: number): Promise<number[]>;
        declare function osc(data: any, length?: number): Promise<number[]>;
    }
    export declare namespace random {
        declare function range(min: any, max: any, rng: any): number;
        declare function pick(data: any, rng: any): any;
        declare function float(min: any, max: any, rng: any): any;
        declare function prng(seed: any): () => number;
    }
    export declare const multi: any;
    export {};
}
