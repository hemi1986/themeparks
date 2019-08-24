// Type definitions for themeparks 5.1.14
// Project: https://github.com/cubehouse/themeparks
// Definitions by: Michael Schempp <https://github.com/hemi1986>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5.3

/// <reference types="node" />

import * as moment from "moment";

declare module "themeparks" {
  let Settings: Settings;

  namespace Parks {
    export class EuropaPark extends Park {}
    export class Phantasialand extends Park {}
  }
}

declare class Park {
  readonly Name: string;
  readonly Timezone: string;
  readonly LocationString: string;
  readonly SupportsWaitTimes: boolean;
  readonly SupportsOpeningTimes: boolean;
  readonly SupportsRideSchedules: boolean;
  readonly FastPass: boolean;
  readonly FastPassReturnTimes: boolean;
  readonly Now: moment.Moment;
  readonly UserAgent: string;
  readonly LongitudeRaw: string;
  readonly Longitude: string;
  readonly LatitudeRaw: string;
  readonly Latitude: string;
  readonly IsValid: string;

  constructor(options?: Options);

  GetWaitTimes(): Promise<RideWaitTimes[]>;
  GetOpeningTimes(): Promise<Schedules[]>;
  toGoogleMaps(): string;
}

export interface Schedules {
  date: string;
  openingTime: string | null;
  closingTime: string | null;
  type: "Operating" | "Closed";
  special?:
    | {
        openingTime: string;
        closingTime: string;
        type: string;
      }[]
    | null;
}

export interface Options {
  name?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  forceCreate?: boolean;
  cacheWaitTimesLength?: number;
  cacheOpeningTimesLength?: number;
  userAgent?: string;
  proxyAgent?: any;
  scheduleDaysToReturn?: number;
}

export interface RideWaitTimes {
  id: string | number;
  name: string;
  waitTime: number;
  active: boolean;
  fastPass: boolean;
  meta: {
    [key: string]: any;
  } | null;
  status: "Operating" | "Closed" | "Refurbishment" | "Down";
  lastUpdate: Date;
  schedule?: {
    openingTime: string;
    closingTime: string;
    type: "Operating" | "Closed";
    special:
      | {
          openingTime: string;
          closingTime: string;
          type: string;
        }[]
      | null;
  };
}

export interface Settings {
  Cache: string;
  DefaultCacheLength: number;
  OpenTimeout: number;
  ReadTimeout: number;
  CacheWaitTimesLength: number;
  CacheOpeningTimesLength: number;
}
