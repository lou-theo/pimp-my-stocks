declare module 'ta.web' {
    /**
     * Relative Strength Index (RSI).
     * @param data
     * @param length default = 14
     */
    export function rsi(data: number[], length?: number): Promise<number[]>;

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

    /**
     * Force Index.
     * @param data Array of [close, volume]
     * @param length default = 13
     */
    export function fi(data: number[][], length?: number): Promise<number[]>;

    /**
     * Williams %R
     * @param data
     * @param length default = 14
     */
    export function pr(data: number[], length?: number): Promise<number[]>;

    /**
     * Stochastics
     * @param data Array of [high, close, low]
     * @param length default = 14
     * @param smoothd default = 3
     * @param smoothk default = 3
     * @returns Array of [kline, dline]
     */
    export function stoch(
        data: number[][],
        length?: number,
        smoothd?: number,
        smoothk?: number
    ): Promise<number[][]>;
    export function atr(data: number[][], length?: number): Promise<number[]>;

    /**
     * Simple Moving Average (SMA).
     * @param data
     * @param length default = 14
     */
    export function sma(data: number[], length?: number): Promise<number[]>;

    /**
     * Smoothed Moving Average (SMMA).
     * @param data
     * @param length default = 14
     */
    export function smma(data: number[], length?: number): Promise<number[]>;

    /**
     * Weighted Moving Average (WMA).
     * @param data
     * @param length default = 14
     */
    export function wma(data: number[], length?: number): Promise<number[]>;

    /**
     * Volume Weighted Moving Average (VWMA).
     * @param data Array of [price, volume (quantity)]
     * @param length default = 20
     */
    export function vwma(data: number[][], length?: number): Promise<number[]>;

    /**
     * Awesome Oscillator
     * @param data Array of [high, low]
     * @param shortLength  default = 5
     * @param longLength default = 35
     */
    export function ao(
        data: number[][],
        shortLength?: number,
        longLength?: number
    ): Promise<number[]>;

    /**
     * Accumulative Swing Index
     * @param data Array of [high, close, low]
     */
    export function asi(data: number[][]): Promise<number[]>;

    /**
     * Exponential Moving Average (EMA)
     * @param data
     * @param length default = 12
     */
    export function ema(data: number[], length?: number): Promise<number[]>;

    /**
     * Moving Average Convergence / Divergence (MACD)
     * @param data
     * @param length1 default = 12
     * @param length2 default = 26
     */
    export function macd(
        data: number[],
        length1?: number,
        length2?: number
    ): Promise<number[]>;

    /**
     * Least Squares Moving Average (LSMA)
     * @param data
     * @param length default = 25
     */
    export function lsma(data: number[], length?: number): Promise<number[]>;

    /**
     * Donchian Channels
     * @param data Array of [high, low]
     * @param length default = 20
     * @returns Array of [upper band, base line, lower band]
     */
    export function don(data: number[][], length?: number): Promise<number[][]>;

    /**
     * Ichimoku Cloud
     * @param data Array of [high, close, low]
     * @param length1 default = 9
     * @param length2 default = 26
     * @param length3 default = 52
     * @param displacement default = 26
     * @returns Array of [conversion line, base line, leading span A, leading span B, lagging span]
     */
    export function ichimoku(
        data: number[][],
        length1?: number,
        length2?: number,
        length3?: number,
        displacement?: number
    ): Promise<number[][]>;

    /**
     * Bollinger Bands
     * @param data
     * @param length default = 14
     * @param deviations default = 1
     * @returns Array of [upper band, middle band, lower band]
     */
    export function bands(
        data: number[],
        length?: number,
        deviations?: number
    ): Promise<number[][]>;

    /**
     * Bollinger Bandwidth
     * @param data
     * @param length default = 14
     * @param deviations default = 1
     */
    export function bandwidth(
        data: number[],
        length?: number,
        deviations?: number
    ): Promise<number[]>;

    /**
     * Median
     * @param data
     * @param length default = data.length
     */
    export function median(data: number, length?: number): Promise<number[]>;

    /**
     * Keltner Channels
     * @param data Array of [high, close, low]
     * @param length default = 14
     * @param deviations default = 1
     * @returns Array of [upper band, middle band, lower band]
     */
    export function keltner(
        data: number[][],
        length?: number,
        deviations?: number
    ): Promise<number[][]>;

    /**
     * Standard Deviation
     * @param data
     * @param length default = data.length
     */
    export function std(data: number, length?: number): Promise<number>;

    /**
     * Correlation
     * @param data1
     * @param data2
     */
    export function cor(data1: number[], data2: number[]): Promise<number>;

    /**
     * Percentage Difference
     * @param newval
     * @param oldval
     */
    export function dif(newval: number, oldval: number): Promise<number>;

    /**
     * Hull Moving Average
     * @param data
     * @param length default = 14
     */
    export function hull(data: number[], length?: number): Promise<number[]>;

    /**
     * Money Flow Index
     * @param data Array of [buy volume, sell volume]
     * @param length default = 14
     */
    export function mfi(data: number[][], length?: number): Promise<number[]>;

    /**
     * Rate Of Change
     * @param data
     * @param length default = 14
     */
    export function roc(data: number[], length?: number): Promise<number[]>;

    /**
     * Know Sure Thing
     * @param data
     * @param r1 default = 10
     * @param r2 default = 15
     * @param r3 default = 20
     * @param r4 default = 30
     * @param s1 default = 10
     * @param s2 default = 10
     * @param s3 default = 10
     * @param s4 default = 15
     * @param sig default = 9
     * @returns Array of [kst line, signal line]
     */
    export function kst(
        data: number[],
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

    /**
     * Volume-Weighted Average Price
     * @param data Array of [average price, volume (quantity)]
     * @param length default = data.length
     */
    export function vwap(data: number[][], length?: number): Promise<number[]>;

    /**
     * Momentum
     * @param data
     * @param length default = 10
     * @param percentage default = false (true returns percentage)
     */
    export function mom(
        data: number[],
        length: number,
        percentage: number
    ): Promise<number[]>;

    /**
     * Chande Momentum Oscillator
     * @param data
     * @param length default = 9
     */
    export function mom_osc(data: number[], length?: number): Promise<number[]>;

    /**
     * Heikin Ashi
     * first 7-10 candles are unreliable
     * @param data Array of [open, high, low, close]
     * @returns Array of [open, high, low, close]
     */
    export function ha(data: number[][]): Promise<number[][]>;

    /**
     * Renko
     * @param data Array of [high, low]
     * @param bricksize
     * @returns Array of [open, high, low, close]
     */
    export function ren(
        data: number[][],
        bricksize?: number
    ): Promise<number[][]>;

    /**
     * Balance Of Power
     * @param data Array of [open, high, low, close]
     * @param length
     */
    export function bop(data: number[][], length?: number): Promise<number[]>;

    /**
     * Coppock Curve
     * @param data
     * @param length1 (ROC period 1) default = 11
     * @param length2 (ROC period 2) default = 14
     * @param length3 (WMA smoothing period) default = 10
     */
    export function cop(
        data: number[],
        length1?: number,
        length2?: number,
        length3?: number
    ): Promise<number[]>;

    /**
     * Kaufman Adaptive Moving Average (KAMA)
     * @param data
     * @param length1
     * @param length2
     * @param length3
     */
    export function kama(
        data: number[],
        length1?: number,
        length2?: number,
        length3?: number
    ): Promise<number[]>;

    /**
     * Median Absolute Deviation
     * @param data
     * @param length default = data.length
     */
    export function mad(data: number[], length?: number): Promise<number[]>;

    /**
     * Average Absolute Deviation
     * @param data
     * @param length default = data.length
     */
    export function aad(data: number[], length?: number): Promise<number[]>;

    /**
     * Variance
     * @param data
     * @param length default = data.length
     */
    export function variance(
        data: number[],
        length?: number
    ): Promise<number[]>;

    /**
     * Sum Squared Differences
     * @param data
     * @param length default = data.length
     */
    export function ssd(data: number[], length?: number): Promise<number[]>;

    /**
     * Parabolic Weighted Moving Average
     * @param data
     * @param length default = 14
     */
    export function pwma(data: number[], length?: number): Promise<number[]>;

    /**
     * Hyperbolic Weighted Moving Average
     * @param data
     * @param length default = 14
     */
    export function hwma(data: number[], length?: number): Promise<number[]>;

    /**
     * K-means Clustering
     * @param data
     * @param clusters
     */
    export function kmeans(
        data: number[],
        clusters: number
    ): Promise<number[][]>;

    /**
     * Drawdown
     * @param data
     */
    export function drawdown(data: number[]): Promise<number>;

    /**
     * Normalize
     * @param data
     * @param margin margin % (default = 0)
     */
    export function normalize(
        data: number[],
        margin?: number
    ): Promise<number[]>;

    /**
     * Denormalize
     * @param data original data || [highest, lowest]
     * @param norm normalized data
     * @param margin margin % (default = 0)
     */
    export function denormalize(
        data: number[] | number[][],
        norm: number[],
        margin?: number
    ): Promise<number[]>;

    /**
     * Wilder's Relative Strength Index
     * @param data
     * @param length default = 14
     */
    export function wrsi(data: number[], length?: number): Promise<number[]>;

    /**
     * Wilder's Smoothing Moving Average
     * @param data
     * @param length default = 14
     */
    export function wsma(data: number[], length?: number): Promise<number[]>;

    /**
     * Inverse Normal Distribution
     * @param data
     */
    export function normsinv(data: number[]): Promise<number>;

    /**
     * Normal CDF
     * @param sample
     * @param mean
     * @param stdv
     */
    export function ncdf(
        sample: number,
        mean: number,
        stdv: number
    ): Promise<number>;

    /**
     * Normal CDF
     * @param zscore
     */
    export function ncdf(zscore: number): Promise<number>;

    /**
     * Monte Carlo Simulation
     * @param data
     * @param length default = 50
     * @param simulations default = 1000
     * @param percentile default = undefined (returns all raw simulations)
     */
    export function sim(
        data: number[],
        length?: number,
        simulations?: number,
        percentile?: number
    ): Promise<number[]>;

    /**
     * Percentile
     * @param data
     * @param percentile
     */
    export function percentile(
        data: number[][],
        percentile: number
    ): Promise<number[]>;

    /**
     * Envelope
     * @param data
     * @param length default = 10
     * @param percentage default = 0.005
     */
    export function envelope(
        data: number[],
        length?: number,
        percentage?: number
    ): Promise<number[][]>;

    /**
     * Chaikin Oscillator
     * @param data Array of [high, close, low, volume]
     * @param ema1 default = 3
     * @param ema2 default = 10
     */
    export function chaikin_osc(
        data: number[][],
        ema1?: number,
        ema2?: number
    ): Promise<number[]>;

    /**
     * Fractals
     * @param data Array of [high, low]
     * @returns Array of [upper fractal, lower fractal]
     */
    export function fractals(data: number[][]): Promise<boolean[][]>;

    /**
     * Recent High
     * @param data
     * @param lookback No higher values after {lookback} periods? resets after each new high
     */
    export function recent_high(
        data: number[],
        lookback?: number
    ): Promise<{
        index: number;
        value: number;
    }>;

    /**
     * Recent Low
     * @param data
     * @param lookback No lower values after {lookback} periods? resets after each new low
     */
    export function recent_low(
        data: number[],
        lookback?: number
    ): Promise<{
        index: number;
        value: number;
    }>;

    export type SupportLine = {
        /**
         * Calculates line at position {position} from start.index (= 0)
         * @example
         * // to get the line at the current candle / chart period
         * var current = await support.calculate(data.length - support.index);
         */
        calculate: (position: number) => Promise<number>;

        /**
         * Delta y per x.
         */
        slope: number;

        /**
         * Lowest (start) value at x = 0
         */
        lowest: number;

        /**
         * (start) index of the lowest value.
         */
        index: number;
    };

    export type ResistanceLine = {
        /**
         * Calculates line at position {position} from start.index (= 0)
         * @example
         * // to get the line at the current candle / chart period
         * var current = await resistance.calculate(data.length - resistance.index);
         */
        calculate: (position: number) => Promise<number>;

        /**
         * Delta y per x.
         */
        slope: number;

        /**
         * Highest (start) value.
         */
        highest: number;

        /**
         * (start) index of highest value.
         */
        index: number;
    };

    /**
     * Support Line.
     * @param data
     * @param start default = recent_low(data, 25);
     */
    export function support(
        data: number[],
        start?: Promise<{
            index: number;
            value: number;
        }>
    ): Promise<SupportLine>;

    /**
     * Resistance Line
     * @param data
     * @param start default = recent_high(data, 25);
     */
    export function resistance(
        data: number[],
        start?: Promise<{
            index: number;
            value: number;
        }>
    ): Promise<ResistanceLine>;

    /**
     * Accelerator Oscillator.
     * @param data Array of [high, low]
     * @param shortlength default = 5
     * @param longlength default = 35
     */
    export function ac(
        data: number[][],
        shortlength?: number,
        longlength?: number
    ): Promise<number[]>;

    /**
     * Fibonacci Retracement
     * @param start
     * @param end
     */
    export function fib(start: number, end: number): Promise<number[]>;

    /**
     * Alligator Indicator.
     * @param data
     * @param jawlength default = 13
     * @param teethlength default = 8
     * @param liplength default = 5
     * @param jawshift default = 8
     * @param teethshift default = 5
     * @param lipshift default = 3
     * @returns Array of [jaw, teeth, lips]
     */
    export function alligator(
        data: number[],
        jawlength?: number,
        teethlength?: number,
        liplength?: number,
        jawshift?: number,
        teethshift?: number,
        lipshift?: number
    ): Promise<number[][]>;

    /**
     * Alligator Oscillator.
     * @param data
     * @param jawlength default = 13
     * @param teethlength default = 8
     * @param liplength default = 5
     * @param jawshift default = 8
     * @param teethshift default = 5
     * @param lipshift default = 3
     */
    export function gator(
        data: number[],
        jawlength?: number,
        teethlength?: number,
        liplength?: number,
        jawshift?: number,
        teethshift?: number,
        lipshift?: number
    ): Promise<number[][]>;

    /**
     * Standardize
     * @param data
     */
    export function standardize(data: number[]): Promise<number[]>;

    /**
     * Expected Return
     * @param data historical return data
     */
    export function er(data: number[]): Promise<number>;

    /**
     * Winratio.
     * @param data
     */
    export function winratio(data: number[]): Promise<number>;

    /**
     * Average Win
     * @param data
     */
    export function avgwin(data: number[]): Promise<number>;

    /**
     * Average Loss
     * @param data
     */
    export function avgloss(data: number[]): Promise<number>;

    /**
     * Fisher Transform
     * @param data Array of 'high + low / 2'
     * @param length
     * @returns Array of [fisher, trigger]
     */
    export function fisher(data: number[], length: number): Promise<number[][]>;

    /**
     * Crossover (golden cross)
     * @param fastdata short period gets spliced when longer
     * @param slowdata
     * @returns Array of {index, cross} - cross is true when fastdata is greater than the slowdata
     */
    export function cross(
        fastdata: number[],
        slowdata: number[]
    ): Promise<
        {
            index: number;
            cross: boolean;
        }[]
    >;

    /**
     * Standard Error
     * @param data
     * @param size default = data.length
     */
    export function se(data: number[], size: number): Promise<number>;

    /**
     * Kelly Criterion
     * @param data
     */
    export function kelly(data: number[]): Promise<number>;

    /**
     * Normalize Pair
     * @param pair1
     * @param pair2
     */
    export function normalize_pair(
        pair1: number[],
        pair2: number[]
    ): Promise<number[][]>;

    /**
     * Normalize From
     * @param data
     * @param baseline
     */
    export function normalize_from(
        data: number[],
        baseline: number
    ): Promise<number[]>;

    /**
     * Abnormal Return
     * @param data historical return data
     * @param length
     */
    export function ar(data: number[], length?: number): Promise<number[]>;

    /**
     * Z-Score
     * @param data
     * @param length default = data.length
     */
    export function zscore(data: number[], length?: number): Promise<number[]>;

    /**
     * Logarithm
     * @param data
     */
    export function log(data: number[]): Promise<number[]>;

    /**
     * Exponent
     * @param data
     */
    export function exp(data: number[]): Promise<number[]>;

    /**
     * HalfTrend.
     * @param data Array of [high, close, low]
     * @param atrlen
     * @param amplitude
     * @param deviation
     * @returns Array of [high, halftrend, low, signal]
     */
    export function halftrend(
        data: number[][],
        atrlen: number,
        amplitude: number,
        deviation: number
    ): Promise<number[][]>;

    /**
     * Sum
     * @param data
     */
    export function sum(data: number[]): Promise<number>;

    /**
     * Covariance.
     * @param data1
     * @param data2
     * @param length
     */
    export function covariance(
        data1: number[],
        data2: number[],
        length: number
    ): Promise<number[]>;

    /**
     * ZigZag
     * @param data Array of [high, low]
     * @param percentage default = 0.05
     */
    export function zigzag(
        data: number[][],
        percentage?: number
    ): Promise<number[]>;

    /**
     * Parabolic SAR
     * @param data
     * @param step
     * @param max
     */
    export function psar(
        data: number[][],
        step?: number,
        max?: number
    ): Promise<number[]>;

    /**
     * MACD Signal
     * @param data
     * @param length1
     * @param length2
     * @param signalLength
     */
    export function macd_signal(
        data: number[],
        length1?: number,
        length2?: number,
        signalLength?: number
    ): Promise<number[]>;

    /**
     * MACD Bars
     * @param data
     * @param length1
     * @param length2
     * @param signalLength
     */
    export function macd_bars(
        data: number[],
        length1?: number,
        length2?: number,
        signalLength?: number
    ): Promise<number[]>;

    export declare namespace aroon {
        /**
         * Aroon Up
         * @param data
         * @param length default = 10
         */
        declare function up(data: number[], length?: number): Promise<number[]>;

        /**
         * Aroon Down
         * @param data
         * @param length default = 10
         */
        declare function down(
            data: number[],
            length?: number
        ): Promise<number[]>;

        /**
         * Aroon Oscillator
         * @param data
         * @param length default = 25
         */
        declare function osc(
            data: number[],
            length?: number
        ): Promise<number[]>;
    }
    export declare namespace random {
        declare function range(
            min: number,
            max: number,
            rng: () => number
        ): number;
        declare function pick<T>(data: T[], rng: () => number): T;
        declare function float(
            min: number,
            max: number,
            rng: () => number
        ): number;
        declare function prng(seed: string): () => number;
    }
}
