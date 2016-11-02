// Type definitions for tile-reduce 3.1.1
// Project: https://github.com/mapbox/tile-reduce
// Definitions by: Denis Carriere <https://github.com/DenisCarriere>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace NodeJS  {
  interface Global {
    mapOptions: any
  }
}

declare module "tile-reduce" {
    type BBox = [number, number, number, number];
    type Tile = [number, number, number];
    type events = 'start' | 'map' | 'reduce' | 'end'

    interface Source {
        name: string;
        mbtiles?: string;
        url?: string;
        layers?: Array<string>;
        maxrate?: number;
        raw?: boolean;
    }

    interface Options {
        bbox?: BBox;
        geojson?: any;
        map?: string;
        sources?: Array<Source>;
        zoom?: number;
        mapOptions?: any;
        maxWorkers?: number;
        output?: any;
        log?: boolean;
        tiles?: Array<Array<Tile>>;
        tileStream?: string | Tile;
        sourceCover?: string;
    }

    interface startEvent {
        (): void;
    }

    interface mapEvent {
        (tile: Tile, workerId: number): void;
    }

    interface reduceEvent {
        (result: any, tile: Tile): void;
    }

    interface endEvent {
        (): void;
    }

    interface Events {
        /**
         * Start Event
         *
         * @returns {Events}
         * @example
         * tilereduce({...})
         * .on('start', () => {
         *     console.log('starting')
         * })
         */
        on(type: 'start', callback: startEvent): Events;

        /**
         * Map Event
         *
         * @param {Tile} tile
         * @param {number} workerId
         * @returns {Events}
         * @example
         * tilereduce({...})
         * .on('map', (tile, workerId) => {
         *     console.log(`about to process [${ tile }] on worker ${ workerId }`)
         * })
         */
        on(type: 'map', callback: mapEvent): Events;

        /**
         * Reduce Event
         *
         * @param {any} result
         * @param {Tile} tile
         * @returns {Events}
         * @example
         * const count = 0
         * tilereduce({...})
         * .on('reduce', (result, tile) => {
         *     console.log(`got a count of ${ result } from ${ tile }`
         *     count ++
         * })
         */
        on(type: 'reduce', callback: reduceEvent): Events;

        /**
         * End Event
         *
         * @returns {Events}
         * @example
         * let count = 0
         * tilereduce({...})
         * .on('end', () => {
         *     console.log(`Total count was: ${ count }`)
         * })
         */
        on(type: 'end', callback: startEvent): Events;
    }

    /**
     * Tile Reduce
     */
    function tileReduce (options: Options): Events;

    namespace tileReduce { }

    export = tileReduce
}
